// Sticker wall — a draggable pile of Wanda stamps and text stickers on a
// gridded dark panel. Pointer + touch drag, positions stored as % of the wall.
import { useEffect, useRef, useState, type MouseEvent as RMouseEvent, type TouchEvent as RTouchEvent } from 'react'
import { WandaStamp } from './Wanda'

interface Sticker {
  id: number
  x: number
  y: number
  r: number
  t: 'stamp' | 'text'
  c: string
  s?: number
  text?: string
}

const INITIAL: Sticker[] = [
  { id: 1, x: 8, y: 18, r: -12, t: 'stamp', c: 'var(--flame)', s: 110 },
  { id: 2, x: 70, y: 12, r: 8, t: 'stamp', c: 'var(--ink)', s: 90 },
  { id: 3, x: 22, y: 62, r: 14, t: 'stamp', c: 'var(--acid)', s: 120 },
  { id: 4, x: 56, y: 50, r: -6, t: 'text', c: 'var(--ink)', text: 'SHE KNOWS.' },
  { id: 5, x: 80, y: 70, r: 4, t: 'text', c: 'var(--flame)', text: 'FERAL × ELEGANT' },
  { id: 6, x: 40, y: 24, r: -20, t: 'stamp', c: 'var(--cream)', s: 80 },
  { id: 7, x: 10, y: 80, r: -4, t: 'text', c: 'var(--acid)', text: 'WILBRAHAM, MA' },
]

export const StickerPack = () => {
  const [stickers, setStickers] = useState<Sticker[]>(INITIAL)
  const [dragId, setDragId] = useState<number | null>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef({ x: 0, y: 0 })

  const onDown = (e: RMouseEvent | RTouchEvent, id: number) => {
    e.preventDefault()
    setDragId(id)
    const wrap = wrapRef.current?.getBoundingClientRect()
    if (!wrap) return
    const s = stickers.find((st) => st.id === id)
    if (!s) return
    const sx = (s.x / 100) * wrap.width
    const sy = (s.y / 100) * wrap.height
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    offsetRef.current = {
      x: clientX - wrap.left - sx,
      y: clientY - wrap.top - sy,
    }
  }

  useEffect(() => {
    if (dragId == null) return
    const onMove = (e: MouseEvent | TouchEvent) => {
      const wrap = wrapRef.current?.getBoundingClientRect()
      if (!wrap) return
      const cx = 'touches' in e ? e.touches[0].clientX : e.clientX
      const cy = 'touches' in e ? e.touches[0].clientY : e.clientY
      const nx = ((cx - wrap.left - offsetRef.current.x) / wrap.width) * 100
      const ny = ((cy - wrap.top - offsetRef.current.y) / wrap.height) * 100
      setStickers((cur) =>
        cur.map((s) =>
          s.id === dragId
            ? { ...s, x: Math.max(0, Math.min(95, nx)), y: Math.max(0, Math.min(92, ny)) }
            : s,
        ),
      )
    }
    const onUp = () => setDragId(null)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchmove', onMove)
    window.addEventListener('touchend', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onUp)
    }
  }, [dragId])

  return (
    <section className="oew-stickers">
      <header className="oew-section-head light">
        <span className="oew-mono">IV · STICKER WALL</span>
        <h2 className="oew-display-l">
          Drag the cats. <span className="italic">Rearrange the cult.</span>
        </h2>
        <p className="oew-section-tag">
          Every subscription box ships with a riso print and a sheet of these. Some of them are
          slightly cursed.
        </p>
      </header>

      <div className="oew-sticker-wall" ref={wrapRef}>
        {stickers.map((s) => (
          <div
            key={s.id}
            className={`oew-sticker ${dragId === s.id ? 'drag' : ''}`}
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              transform: `rotate(${s.r}deg)`,
              zIndex: dragId === s.id ? 50 : 1,
            }}
            onMouseDown={(e) => onDown(e, s.id)}
            onTouchStart={(e) => onDown(e, s.id)}
          >
            {s.t === 'stamp' ? (
              <WandaStamp
                size={s.s}
                color={s.c}
                knockout={s.c === 'var(--ink)' ? 'var(--cream)' : 'var(--ink)'}
              />
            ) : (
              <div
                className="oew-text-sticker"
                style={{ background: s.c, color: s.c === 'var(--ink)' ? 'var(--cream)' : 'var(--ink)' }}
              >
                {s.text}
              </div>
            )}
          </div>
        ))}
        <div className="oew-sticker-hint oew-mono">↑ DRAG ME ↑</div>
      </div>
    </section>
  )
}
