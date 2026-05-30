// Marquee — interleaves text "ribs" with alternating cat + coffee glyph dots
// so the whole page reads as one brand language, not just a wordmark
// scrolling. The track is duplicated and translated -50% for a seamless loop.
import { Fragment } from 'react'
import { WandaStamp } from './Wanda'
import { CoffeeIcon } from './CoffeeIcon'

const MARQUEE_GLYPHS = ['cat', 'bean', 'cup', 'cherry', 'spark']

interface MarqueeProps {
  items: string[]
  speed?: number
  accent?: boolean
}

export const Marquee = ({ items, speed = 60, accent = false }: MarqueeProps) => {
  const content = (
    <div className="oew-marquee-track" style={{ animationDuration: `${speed}s` }}>
      {[...Array(2)].map((_, i) => (
        <div className="oew-marquee-row" key={i}>
          {items.map((it, j) => {
            const g = MARQUEE_GLYPHS[j % MARQUEE_GLYPHS.length]
            const color = accent ? 'var(--ink)' : 'var(--cream)'
            return (
              <Fragment key={j}>
                <span className="oew-marquee-item">{it}</span>
                <span className="oew-marquee-dot">
                  {g === 'cat' ? (
                    <WandaStamp size={42} color={color} knockout={accent ? 'var(--cream)' : 'var(--ink)'} />
                  ) : (
                    <CoffeeIcon
                      name={g}
                      size={42}
                      ink={color}
                      accent={accent ? 'var(--cream)' : 'var(--flame)'}
                      paper={accent ? 'var(--flame)' : 'var(--ink)'}
                    />
                  )}
                </span>
              </Fragment>
            )
          })}
        </div>
      ))}
    </div>
  )
  return <div className={`oew-marquee ${accent ? 'accent' : ''}`}>{content}</div>
}
