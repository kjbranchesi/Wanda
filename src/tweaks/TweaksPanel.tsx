// Tweaks panel — a floating, draggable glass panel of brand controls plus the
// form-control primitives it hosts. Adapted from the prototype: the design-host
// protocol (postMessage activate/deactivate, deck-stage rail) is removed and a
// visible launcher button (.twk-fab) opens it, since there's no host toolbar.
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent as RMouseEvent,
  type PointerEvent as RPointerEvent,
  type ReactNode,
} from 'react'

// ── Layout helpers ───────────────────────────────────────────────────────────

export function TweakSection({ label, children }: { label: string; children?: ReactNode }) {
  return (
    <>
      <div className="twk-sect">{label}</div>
      {children}
    </>
  )
}

function TweakRow({
  label,
  value,
  children,
  inline = false,
}: {
  label: string
  value?: string | null
  children?: ReactNode
  inline?: boolean
}) {
  return (
    <div className={inline ? 'twk-row twk-row-h' : 'twk-row'}>
      <div className="twk-lbl">
        <span>{label}</span>
        {value != null && <span className="twk-val">{value}</span>}
      </div>
      {children}
    </div>
  )
}

// ── Controls ──────────────────────────────────────────────────────────────────

export function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange,
}: {
  label: string
  value: number
  min?: number
  max?: number
  step?: number
  unit?: string
  onChange: (v: number) => void
}) {
  return (
    <TweakRow label={label} value={`${value}${unit}`}>
      <input
        type="range"
        className="twk-slider"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </TweakRow>
  )
}

export function TweakToggle({
  label,
  value,
  onChange,
}: {
  label: string
  value: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div className="twk-row twk-row-h">
      <div className="twk-lbl">
        <span>{label}</span>
      </div>
      <button
        type="button"
        className="twk-toggle"
        data-on={value ? '1' : '0'}
        role="switch"
        aria-checked={!!value}
        onClick={() => onChange(!value)}
      >
        <i />
      </button>
    </div>
  )
}

interface RadioOption {
  value: string
  label: string
}

function TweakSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: RadioOption[]
  onChange: (v: string) => void
}) {
  return (
    <TweakRow label={label}>
      <select className="twk-field" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </TweakRow>
  )
}

export function TweakRadio({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: RadioOption[]
  onChange: (v: string) => void
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [dragging, setDragging] = useState(false)
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = useRef(value)
  valueRef.current = value

  // Past ~16 chars (2 opts) / ~10 (3 opts) or >3 options, fall back to a
  // dropdown rather than wrap the segmented control.
  const maxLen = options.reduce((m, o) => Math.max(m, o.label.length), 0)
  const fitsAsSegments = maxLen <= (({ 2: 16, 3: 10 } as Record<number, number>)[options.length] ?? 0)
  if (!fitsAsSegments) {
    return <TweakSelect label={label} value={value} options={options} onChange={onChange} />
  }
  const idx = Math.max(
    0,
    options.findIndex((o) => o.value === value),
  )
  const n = options.length

  const segAt = (clientX: number) => {
    const r = trackRef.current!.getBoundingClientRect()
    const inner = r.width - 4
    const i = Math.floor(((clientX - r.left - 2) / inner) * n)
    return options[Math.max(0, Math.min(n - 1, i))].value
  }

  const onPointerDown = (e: RPointerEvent) => {
    setDragging(true)
    const v0 = segAt(e.clientX)
    if (v0 !== valueRef.current) onChange(v0)
    const move = (ev: PointerEvent) => {
      if (!trackRef.current) return
      const v = segAt(ev.clientX)
      if (v !== valueRef.current) onChange(v)
    }
    const up = () => {
      setDragging(false)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
  }

  return (
    <TweakRow label={label}>
      <div
        ref={trackRef}
        role="radiogroup"
        onPointerDown={onPointerDown}
        className={dragging ? 'twk-seg dragging' : 'twk-seg'}
      >
        <div
          className="twk-seg-thumb"
          style={{
            left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
            width: `calc((100% - 4px) / ${n})`,
          }}
        />
        {options.map((o) => (
          <button key={o.value} type="button" role="radio" aria-checked={o.value === value}>
            {o.label}
          </button>
        ))}
      </div>
    </TweakRow>
  )
}

export function TweakText({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string
  value: string
  placeholder?: string
  onChange: (v: string) => void
}) {
  return (
    <TweakRow label={label}>
      <input
        className="twk-field"
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </TweakRow>
  )
}

// Relative-luminance contrast pick — the checkmark over a swatch needs to read
// on both dark and light hero colors. Hex input only; other formats → "light".
function twkIsLight(hex: string): boolean {
  const h = String(hex).replace('#', '')
  const x = h.length === 3 ? h.replace(/./g, (c) => c + c) : h.padEnd(6, '0')
  const n = parseInt(x.slice(0, 6), 16)
  if (Number.isNaN(n)) return true
  const r = (n >> 16) & 255
  const g = (n >> 8) & 255
  const b = n & 255
  return r * 299 + g * 587 + b * 114 > 148000
}

const TwkCheck = ({ light }: { light: boolean }) => (
  <svg viewBox="0 0 14 14" aria-hidden="true">
    <path
      d="M3 7.2 5.8 10 11 4.2"
      fill="none"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke={light ? 'rgba(0,0,0,.78)' : '#fff'}
    />
  </svg>
)

// TweakColor — curated palette picker. Each option is an array of hex strings;
// the card renders colors[0] as the hero (left ~2/3) with the rest stacked in a
// sharp column on the right. onChange emits the selected palette array.
export function TweakColor({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string[]
  options: string[][]
  onChange: (v: string[]) => void
}) {
  const key = (o: string[]) => JSON.stringify(o).toLowerCase()
  const cur = key(value)
  return (
    <TweakRow label={label}>
      <div className="twk-chips" role="radiogroup">
        {options.map((o, i) => {
          const [hero, ...rest] = o
          const sup = rest.slice(0, 4)
          const on = key(o) === cur
          return (
            <button
              key={i}
              type="button"
              className="twk-chip"
              role="radio"
              aria-checked={on}
              data-on={on ? '1' : '0'}
              aria-label={o.join(', ')}
              title={o.join(' · ')}
              style={{ background: hero }}
              onClick={() => onChange(o)}
            >
              {sup.length > 0 && (
                <span>
                  {sup.map((c, j) => (
                    <i key={j} style={{ background: c }} />
                  ))}
                </span>
              )}
              {on && <TwkCheck light={twkIsLight(hero)} />}
            </button>
          )
        })}
      </div>
    </TweakRow>
  )
}

// ── Panel shell ────────────────────────────────────────────────────────────────

export function TweaksPanel({ title = 'Tweaks', children }: { title?: string; children?: ReactNode }) {
  const [open, setOpen] = useState(false)
  const dragRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef({ x: 16, y: 16 })
  const PAD = 16

  const clampToViewport = useCallback(() => {
    const panel = dragRef.current
    if (!panel) return
    const w = panel.offsetWidth
    const h = panel.offsetHeight
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD)
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD)
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y)),
    }
    panel.style.right = offsetRef.current.x + 'px'
    panel.style.bottom = offsetRef.current.y + 'px'
  }, [])

  useEffect(() => {
    if (!open) return
    clampToViewport()
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport)
      return () => window.removeEventListener('resize', clampToViewport)
    }
    const ro = new ResizeObserver(clampToViewport)
    ro.observe(document.documentElement)
    return () => ro.disconnect()
  }, [open, clampToViewport])

  const onDragStart = (e: RMouseEvent) => {
    const panel = dragRef.current
    if (!panel) return
    const r = panel.getBoundingClientRect()
    const sx = e.clientX
    const sy = e.clientY
    const startRight = window.innerWidth - r.right
    const startBottom = window.innerHeight - r.bottom
    const move = (ev: MouseEvent) => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy),
      }
      clampToViewport()
    }
    const up = () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseup', up)
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', up)
  }

  if (!open) {
    return (
      <button className="twk-fab" aria-label="Open tweaks" onClick={() => setOpen(true)}>
        <svg width="20" height="20" viewBox="0 0 60 60" aria-hidden="true">
          <ellipse cx="30" cy="30" rx="22" ry="26" fill="var(--flame)" stroke="var(--cream)" strokeWidth="4" />
          <ellipse cx="30" cy="30" rx="9" ry="11" fill="var(--cream)" />
        </svg>
        Tweaks
      </button>
    )
  }

  return (
    <div
      ref={dragRef}
      className="twk-panel"
      style={{ right: offsetRef.current.x, bottom: offsetRef.current.y }}
    >
      <div className="twk-hd" onMouseDown={onDragStart}>
        <b>{title}</b>
        <button
          className="twk-x"
          aria-label="Close tweaks"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={() => setOpen(false)}
        >
          ✕
        </button>
      </div>
      <div className="twk-body">{children}</div>
    </div>
  )
}
