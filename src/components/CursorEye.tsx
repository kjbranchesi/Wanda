// Cursor-follow eye — a single Wanda eye that tracks the pointer, its pupil
// aimed away from screen center. mix-blend-mode: difference keeps it legible
// over any background.
import { useEffect, useState } from 'react'
import { WandaEye } from './Wanda'

export const CursorEye = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [pupil, setPupil] = useState({ x: 0, y: 0 })
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      setHidden(false)
      // compute pupil offset based on direction from screen center
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const mag = Math.sqrt(dx * dx + dy * dy) || 1
      const max = 6
      setPupil({
        x: (dx / mag) * Math.min(max, mag / 80),
        y: (dy / mag) * Math.min(max, mag / 80),
      })
    }
    const onLeave = () => setHidden(true)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        left: pos.x,
        top: pos.y,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: hidden ? 0 : 1,
        transition: 'opacity 0.2s',
        mixBlendMode: 'difference',
      }}
    >
      <WandaEye size={36} pupilOffset={pupil} ink="#F7F4ED" fill="#FF4D2E" />
    </div>
  )
}
