// DesignCanvas — a Figma-ish pan/zoom canvas of brand artboards.
//
// Ported from the prototype's design-canvas for a *published* brand system:
// the core viewer experience is kept (pan, zoom, fit, fullscreen focus with
// keyboard nav) while the editor/host-only machinery — drag-reorder, rename,
// delete, PNG/HTML export, and sidecar persistence over the design-host
// bridge — is dropped. Zoom is affine; artboard labels counter-scale (via
// --dc-inv-zoom, transform only) so they stay readable at any zoom.
import {
  Children,
  createContext,
  Fragment,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'

const DC = {
  bg: '#f0eee9',
  grid: 'rgba(0,0,0,0.06)',
  label: 'rgba(60,50,40,0.7)',
  title: 'rgba(40,30,20,0.85)',
  subtitle: 'rgba(60,50,40,0.6)',
  font: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
}

const MIN_SCALE = 0.1
const MAX_SCALE = 4

// ── Public marker components ──────────────────────────────────────────────────
export interface DCArtboardProps {
  id?: string
  label: string
  width?: number
  height?: number
  children?: ReactNode
  style?: CSSProperties
}
// Rendered by DCArtboardFrame via DCSection; never renders itself.
export function DCArtboard(_props: DCArtboardProps) {
  return null
}

export interface DCSectionProps {
  id?: string
  title: string
  subtitle?: string
  children?: ReactNode
  gap?: number
}

// ── Context (focus state only) ────────────────────────────────────────────────
interface DCContextValue {
  focus: string | null
  setFocus: (id: string | null) => void
}
const DCCtx = createContext<DCContextValue | null>(null)

// Recursively unwrap fragments so <>…</> grouping doesn't hide children.
function dcFlatten(children: ReactNode): ReactElement[] {
  const out: ReactElement[] = []
  Children.forEach(children, (c) => {
    if (!isValidElement(c)) return
    if (c.type === Fragment) out.push(...dcFlatten((c.props as { children?: ReactNode }).children))
    else out.push(c)
  })
  return out
}

interface SectionMetaEntry {
  title: string
  subtitle?: string
  slotIds: string[]
}
interface RegistryEntry {
  sectionId: string
  artboard: ReactElement<DCArtboardProps>
}

// ── DesignCanvas — viewport + focus orchestration ─────────────────────────────
export function DesignCanvas({ children }: { children?: ReactNode }) {
  const [focus, setFocus] = useState<string | null>(null)

  // Build focus registry + section metadata from the declarative children.
  const registry: Record<string, RegistryEntry> = {}
  const sectionMeta: Record<string, SectionMetaEntry> = {}
  const sectionOrder: string[] = []
  dcFlatten(children).forEach((sec) => {
    if (sec.type !== DCSection) return
    const p = sec.props as DCSectionProps
    const sid = p.id ?? p.title
    sectionOrder.push(sid)
    const slotIds: string[] = []
    dcFlatten(p.children).forEach((ab) => {
      if (ab.type !== DCArtboard) return
      const ap = ab.props as DCArtboardProps
      const aid = ap.id ?? ap.label
      registry[`${sid}/${aid}`] = { sectionId: sid, artboard: ab as ReactElement<DCArtboardProps> }
      slotIds.push(aid)
    })
    sectionMeta[sid] = { title: p.title, subtitle: p.subtitle, slotIds }
  })

  // Esc exits focus.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFocus(null)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <DCCtx.Provider value={{ focus, setFocus }}>
      <DCViewport>{children}</DCViewport>
      {focus && registry[focus] && (
        <DCFocusOverlay entry={registry[focus]} sectionMeta={sectionMeta} sectionOrder={sectionOrder} />
      )}
    </DCCtx.Provider>
  )
}

// ── DCViewport — transform-based pan/zoom (affine) ────────────────────────────
function DCViewport({ children }: { children?: ReactNode }) {
  const vpRef = useRef<HTMLDivElement>(null)
  const worldRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const tf = useRef({ x: 0, y: 0, scale: 1 })
  const [pct, setPct] = useState(100)
  const lastPct = useRef(100)
  const saveT = useRef(0)
  const TF_KEY = 'oew-bs-viewport'

  const clamp = (s: number) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, s))

  const apply = useCallback(() => {
    const el = worldRef.current
    if (!el) return
    const { x, y, scale } = tf.current
    el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
    el.style.setProperty('--dc-inv-zoom', String(1 / scale))
    const p = Math.round(scale * 100)
    if (p !== lastPct.current) {
      lastPct.current = p
      setPct(p)
    }
    clearTimeout(saveT.current)
    saveT.current = window.setTimeout(() => {
      try {
        localStorage.setItem(TF_KEY, JSON.stringify(tf.current))
      } catch {
        /* ignore */
      }
    }, 200)
  }, [])

  const zoomAt = useCallback(
    (cx: number, cy: number, factor: number) => {
      const vp = vpRef.current
      if (!vp) return
      const r = vp.getBoundingClientRect()
      const px = cx - r.left
      const py = cy - r.top
      const t = tf.current
      const next = clamp(t.scale * factor)
      const k = next / t.scale
      // keep the world point under (cx, cy) fixed on screen
      t.x = px - (px - t.x) * k
      t.y = py - (py - t.y) * k
      t.scale = next
      apply()
    },
    [apply],
  )

  const center = (): [number, number] => {
    const vp = vpRef.current
    if (!vp) return [0, 0]
    const r = vp.getBoundingClientRect()
    return [r.left + r.width / 2, r.top + r.height / 2]
  }

  // FIT — zoom so the whole canvas is visible (Figma-style "zoom to fit").
  const fit = useCallback(() => {
    const vp = vpRef.current
    const content = contentRef.current
    if (!vp || !content) return
    const vw = vp.clientWidth
    const vh = vp.clientHeight
    const cw = content.scrollWidth
    const ch = content.scrollHeight
    if (!cw || !ch) return
    const pad = 90
    const scale = clamp(Math.min((vw - pad * 2) / cw, (vh - pad * 2) / ch))
    tf.current.scale = scale
    tf.current.x = (vw - cw * scale) / 2
    tf.current.y = Math.max(pad, (vh - ch * scale) / 2)
    apply()
  }, [apply])

  // Initial view — fit the canvas WIDTH (never upscale past 100%), top-aligned
  // below the topbar. The canvas is tall and stacked, so a full fit-to-view
  // would render everything too small to read; this starts you on the first
  // sections at a legible scale, and the Fit button is there for the overview.
  const initialView = useCallback(() => {
    const vp = vpRef.current
    const content = contentRef.current
    if (!vp || !content) return
    const vw = vp.clientWidth
    // Fit the FIRST section's row to the width (not the whole canvas — the
    // widest row is an outlier and would force everything tiny). Keeps the
    // opening view zoomed-in enough that labels read; pan/zoom for the rest.
    const firstRow = content.querySelector('[data-dc-section] > div:last-child') as HTMLElement | null
    const targetW = firstRow?.scrollWidth || content.scrollWidth || 1
    const scale = clamp(Math.min((vw - 80) / targetW, 1))
    tf.current.scale = scale
    tf.current.x = 40
    tf.current.y = 88
    apply()
  }, [apply])

  // Restore the saved viewport, or fit-to-view on first load.
  useLayoutEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem(TF_KEY) || 'null')
      if (s && Number.isFinite(s.x) && Number.isFinite(s.y) && Number.isFinite(s.scale)) {
        tf.current = { x: s.x, y: s.y, scale: clamp(s.scale) }
        apply()
        return
      }
    } catch {
      /* ignore */
    }
    // Layout is already committed in a layout effect, so measure + set the view
    // now (no rAF — it can be throttled when the tab isn't focused), then once
    // more after fonts settle. initialView is idempotent.
    initialView()
    const t = window.setTimeout(initialView, 150)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Wheel (zoom / pan) + pointer (drag-pan, pinch) handlers.
  useEffect(() => {
    const vp = vpRef.current
    if (!vp) return

    // notched mouse wheel sends line-mode or large integer pixel deltas with no
    // X component; trackpad two-finger scroll sends small/fractional deltas.
    const isMouseWheel = (e: WheelEvent) =>
      e.deltaMode !== 0 || (e.deltaX === 0 && Number.isInteger(e.deltaY) && Math.abs(e.deltaY) >= 40)

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      if ((e.ctrlKey || e.metaKey) && !isMouseWheel(e)) {
        zoomAt(e.clientX, e.clientY, Math.exp(-e.deltaY * 0.01)) // trackpad pinch
      } else if (isMouseWheel(e)) {
        zoomAt(e.clientX, e.clientY, Math.exp(-Math.sign(e.deltaY) * 0.18)) // wheel notch
      } else {
        tf.current.x -= e.deltaX // trackpad two-finger pan
        tf.current.y -= e.deltaY
        apply()
      }
    }

    // Safari trackpad pinch.
    let gsBase = 1
    const onGestureStart = (e: Event) => {
      e.preventDefault()
      gsBase = tf.current.scale
    }
    const onGestureChange = (e: Event) => {
      e.preventDefault()
      const g = e as Event & { scale: number; clientX: number; clientY: number }
      zoomAt(g.clientX, g.clientY, (gsBase * g.scale) / tf.current.scale)
    }

    // Pointer pan (1 pointer) + pinch (2 pointers); covers mouse + touch.
    const pts = new Map<number, { x: number; y: number }>()
    let pinch: { dist: number; cx: number; cy: number } | null = null
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Element
      if (target.closest('button, a')) return // let controls/labels handle their own clicks
      if (e.button !== 0 && e.button !== 1) return
      vp.setPointerCapture(e.pointerId)
      pts.set(e.pointerId, { x: e.clientX, y: e.clientY })
      vp.style.cursor = 'grabbing'
    }
    const onPointerMove = (e: PointerEvent) => {
      const prev = pts.get(e.pointerId)
      if (!prev) return
      pts.set(e.pointerId, { x: e.clientX, y: e.clientY })
      if (pts.size === 1) {
        tf.current.x += e.clientX - prev.x
        tf.current.y += e.clientY - prev.y
        apply()
      } else if (pts.size === 2) {
        const [a, b] = [...pts.values()]
        const dist = Math.hypot(b.x - a.x, b.y - a.y)
        const cx = (a.x + b.x) / 2
        const cy = (a.y + b.y) / 2
        if (pinch) {
          zoomAt(cx, cy, dist / pinch.dist)
          tf.current.x += cx - pinch.cx
          tf.current.y += cy - pinch.cy
          apply()
        }
        pinch = { dist, cx, cy }
      }
    }
    const onPointerUp = (e: PointerEvent) => {
      pts.delete(e.pointerId)
      if (pts.size < 2) pinch = null
      if (pts.size === 0) vp.style.cursor = ''
      try {
        vp.releasePointerCapture(e.pointerId)
      } catch {
        /* ignore */
      }
    }

    vp.addEventListener('wheel', onWheel, { passive: false })
    vp.addEventListener('gesturestart', onGestureStart as EventListener, { passive: false })
    vp.addEventListener('gesturechange', onGestureChange as EventListener, { passive: false })
    vp.addEventListener('pointerdown', onPointerDown)
    vp.addEventListener('pointermove', onPointerMove)
    vp.addEventListener('pointerup', onPointerUp)
    vp.addEventListener('pointercancel', onPointerUp)
    return () => {
      vp.removeEventListener('wheel', onWheel)
      vp.removeEventListener('gesturestart', onGestureStart as EventListener)
      vp.removeEventListener('gesturechange', onGestureChange as EventListener)
      vp.removeEventListener('pointerdown', onPointerDown)
      vp.removeEventListener('pointermove', onPointerMove)
      vp.removeEventListener('pointerup', onPointerUp)
      vp.removeEventListener('pointercancel', onPointerUp)
    }
  }, [apply, zoomAt])

  const gridSvg = `url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M120 0H0v120' fill='none' stroke='${encodeURIComponent(
    DC.grid,
  )}' stroke-width='1'/%3E%3C/svg%3E")`

  return (
    <div
      ref={vpRef}
      className="dc-viewport"
      style={{
        position: 'fixed',
        inset: 0,
        background: DC.bg,
        overflow: 'hidden',
        overscrollBehavior: 'none',
        touchAction: 'none',
        cursor: 'grab',
        fontFamily: DC.font,
      }}
    >
      <div ref={worldRef} style={{ position: 'absolute', top: 0, left: 0, transformOrigin: '0 0', willChange: 'transform' }}>
        <div
          style={{
            position: 'absolute',
            inset: -6000,
            backgroundImage: gridSvg,
            backgroundSize: '120px 120px',
            pointerEvents: 'none',
            zIndex: -1,
          }}
        />
        <div ref={contentRef} style={{ width: 'max-content', padding: '60px 0 80px' }}>
          {children}
        </div>
      </div>

      <div className="dc-zoom">
        <button title="Zoom out" onClick={() => zoomAt(...center(), 1 / 1.2)}>
          −
        </button>
        <button
          className="dc-zoom-pct"
          title="Reset to 100%"
          onClick={() => {
            const [cx, cy] = center()
            zoomAt(cx, cy, 1 / tf.current.scale)
          }}
        >
          {pct}%
        </button>
        <button title="Zoom in" onClick={() => zoomAt(...center(), 1.2)}>
          +
        </button>
        <span className="dc-zoom-sep" />
        <button className="dc-zoom-fit" title="Fit to view" onClick={fit}>
          Fit
        </button>
      </div>
    </div>
  )
}

// ── DCSection — title + horizontal row of artboards ───────────────────────────
export function DCSection({ id, title, subtitle, children, gap = 48 }: DCSectionProps) {
  const sid = id ?? title
  const artboards = dcFlatten(children).filter((c) => c.type === DCArtboard) as ReactElement<DCArtboardProps>[]
  return (
    <div data-dc-section={sid} style={{ marginBottom: 96, position: 'relative' }}>
      <div style={{ padding: '0 60px' }}>
        <div style={{ paddingBottom: 28 }}>
          <div style={{ fontSize: 28, fontWeight: 600, color: DC.title, letterSpacing: -0.4, marginBottom: 6 }}>
            {title}
          </div>
          {subtitle && <div style={{ fontSize: 16, color: DC.subtitle }}>{subtitle}</div>}
        </div>
      </div>
      <div style={{ display: 'flex', gap, padding: '0 60px', alignItems: 'flex-start', width: 'max-content' }}>
        {artboards.map((ab) => {
          const ap = ab.props
          const aid = ap.id ?? ap.label
          return <DCArtboardFrame key={aid} sectionId={sid} artboard={ab} />
        })}
      </div>
    </div>
  )
}

// ── DCArtboardFrame — labeled card; click label/expand to focus ───────────────
function DCArtboardFrame({ sectionId, artboard }: { sectionId: string; artboard: ReactElement<DCArtboardProps> }) {
  const ctx = useContext(DCCtx)!
  const { id: rawId, label, width = 260, height = 480, children, style = {} } = artboard.props
  const id = rawId ?? label
  const onFocus = () => ctx.setFocus(`${sectionId}/${id}`)
  return (
    <div data-dc-slot={id} style={{ position: 'relative', flexShrink: 0 }}>
      <div className="dc-header">
        <div className="dc-labeltext" onClick={onFocus} title="Click to focus">
          {label}
        </div>
        <button className="dc-expand" onClick={onFocus} title="Open fullscreen">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="M7 1h4v4M5 11H1V7M11 1L7.5 4.5M1 11l3.5-3.5" />
          </svg>
        </button>
      </div>
      <div className="dc-card" style={{ width, height, ...style }}>
        {children}
      </div>
    </div>
  )
}

// ── DCFocusOverlay — fullscreen one artboard; ←/→ peers, ↑/↓ sections ─────────
function DCFocusOverlay({
  entry,
  sectionMeta,
  sectionOrder,
}: {
  entry: RegistryEntry
  sectionMeta: Record<string, SectionMetaEntry>
  sectionOrder: string[]
}) {
  const ctx = useContext(DCCtx)!
  const { sectionId, artboard } = entry
  const meta = sectionMeta[sectionId]
  const peers = meta.slotIds
  const aid = artboard.props.id ?? artboard.props.label
  const idx = peers.indexOf(aid)
  const secIdx = sectionOrder.indexOf(sectionId)
  const [ddOpen, setDd] = useState(false)

  const go = (d: number) => {
    const n = peers[(idx + d + peers.length) % peers.length]
    if (n) ctx.setFocus(`${sectionId}/${n}`)
  }
  const goSection = (d: number) => {
    const n = sectionOrder.length
    for (let i = 1; i < n; i++) {
      const ns = sectionOrder[(((secIdx + d * i) % n) + n) % n]
      const first = sectionMeta[ns]?.slotIds[0]
      if (first) {
        ctx.setFocus(`${ns}/${first}`)
        return
      }
    }
  }

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        go(-1)
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        go(1)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        goSection(-1)
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        goSection(1)
      }
    }
    document.addEventListener('keydown', k)
    return () => document.removeEventListener('keydown', k)
  })

  const { width = 260, height = 480, children } = artboard.props
  const [vp, setVp] = useState({ w: window.innerWidth, h: window.innerHeight })
  useEffect(() => {
    const r = () => setVp({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener('resize', r)
    return () => window.removeEventListener('resize', r)
  }, [])
  const scale = Math.max(0.1, Math.min((vp.w - 200) / width, (vp.h - 260) / height, 2))

  const Arrow = ({ dir, onClick }: { dir: 'left' | 'right'; onClick: () => void }) => (
    <button
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      style={{
        position: 'absolute',
        top: '50%',
        [dir]: 28,
        transform: 'translateY(-50%)',
        border: 'none',
        background: 'rgba(255,255,255,.08)',
        color: 'rgba(255,255,255,.9)',
        width: 44,
        height: 44,
        borderRadius: 22,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background .15s',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,.18)')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,.08)')}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d={dir === 'left' ? 'M11 3L5 9l6 6' : 'M7 3l6 6-6 6'} />
      </svg>
    </button>
  )

  return createPortal(
    <div
      onClick={() => ctx.setFocus(null)}
      onWheel={(e) => e.preventDefault()}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'rgba(24,20,16,.6)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        fontFamily: DC.font,
        color: '#fff',
      }}
    >
      {/* top bar: section dropdown (left) · close (right) */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 72, display: 'flex', alignItems: 'flex-start', padding: '16px 20px 0', gap: 16 }}
      >
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setDd((o) => !o)}
            style={{ border: 'none', background: 'transparent', color: '#fff', cursor: 'pointer', padding: '6px 8px', borderRadius: 6, textAlign: 'left', fontFamily: 'inherit' }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 18, fontWeight: 600, letterSpacing: -0.3 }}>{meta.title}</span>
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" style={{ opacity: 0.7 }}>
                <path d="M2 4l3.5 3.5L9 4" />
              </svg>
            </span>
            {meta.subtitle && <span style={{ display: 'block', fontSize: 13, opacity: 0.6, fontWeight: 400, marginTop: 2 }}>{meta.subtitle}</span>}
          </button>
          {ddOpen && (
            <div
              style={{ position: 'absolute', top: '100%', left: 0, marginTop: 4, background: '#2a251f', borderRadius: 8, boxShadow: '0 8px 32px rgba(0,0,0,.4)', padding: 4, minWidth: 200, zIndex: 10 }}
            >
              {sectionOrder
                .filter((sid) => sectionMeta[sid].slotIds.length)
                .map((sid) => (
                  <button
                    key={sid}
                    onClick={() => {
                      setDd(false)
                      const f = sectionMeta[sid].slotIds[0]
                      if (f) ctx.setFocus(`${sid}/${f}`)
                    }}
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      border: 'none',
                      cursor: 'pointer',
                      background: sid === sectionId ? 'rgba(255,255,255,.1)' : 'transparent',
                      color: '#fff',
                      padding: '8px 12px',
                      borderRadius: 5,
                      fontSize: 14,
                      fontWeight: sid === sectionId ? 600 : 400,
                      fontFamily: 'inherit',
                    }}
                  >
                    {sectionMeta[sid].title}
                  </button>
                ))}
            </div>
          )}
        </div>
        <div style={{ flex: 1 }} />
        <button
          onClick={() => ctx.setFocus(null)}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,.12)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          style={{ border: 'none', background: 'transparent', color: 'rgba(255,255,255,.7)', width: 32, height: 32, borderRadius: 16, fontSize: 20, cursor: 'pointer', lineHeight: 1, transition: 'background .12s' }}
        >
          ×
        </button>
      </div>

      {/* centered card + label */}
      <div style={{ position: 'absolute', top: 64, bottom: 56, left: 100, right: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <div onClick={(e) => e.stopPropagation()} style={{ width: width * scale, height: height * scale, position: 'relative' }}>
          <div
            style={{ width, height, transform: `scale(${scale})`, transformOrigin: 'top left', background: '#fff', borderRadius: 2, overflow: 'hidden', boxShadow: '0 20px 80px rgba(0,0,0,.4)' }}
          >
            {children}
          </div>
        </div>
        <div onClick={(e) => e.stopPropagation()} style={{ fontSize: 14, fontWeight: 500, opacity: 0.85, textAlign: 'center' }}>
          {artboard.props.label}
          <span style={{ opacity: 0.5, marginLeft: 10, fontVariantNumeric: 'tabular-nums' }}>
            {idx + 1} / {peers.length}
          </span>
        </div>
      </div>

      <Arrow dir="left" onClick={() => go(-1)} />
      <Arrow dir="right" onClick={() => go(1)} />

      {/* dots */}
      <div onClick={(e) => e.stopPropagation()} style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8 }}>
        {peers.map((p, i) => (
          <button
            key={p}
            onClick={() => ctx.setFocus(`${sectionId}/${p}`)}
            style={{ border: 'none', padding: 0, cursor: 'pointer', width: 6, height: 6, borderRadius: 3, background: i === idx ? '#fff' : 'rgba(255,255,255,.3)' }}
          />
        ))}
      </div>
    </div>,
    document.body,
  )
}
