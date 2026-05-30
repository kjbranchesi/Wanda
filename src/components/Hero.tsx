// Hero — Wanda as a haloed "patron saint", framed and slightly tilted.
// She blinks every ~4.2s (variant flips to a closed-eye loaf for 160ms).
import { useEffect, useState } from 'react'
import { WandaCat } from './Wanda'

interface HeroProps {
  tagline: string
}

export const Hero = ({ tagline }: HeroProps) => {
  const [blink, setBlink] = useState(false)
  useEffect(() => {
    const id = setInterval(() => {
      setBlink(true)
      setTimeout(() => setBlink(false), 160)
    }, 4200)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="oew-hero">
      <div className="oew-hero-stamp oew-mono">
        <span>EST. 2026</span>
        <span>·</span>
        <span>WILBRAHAM · MASSACHUSETTS</span>
        <span>·</span>
        <span>LOT №017</span>
      </div>

      <div className="oew-hero-grid">
        <div className="oew-hero-type">
          <h1 className="oew-display-x">
            <span className="line">ONE</span>
            <span className="line">EYED</span>
            <span className="line italic">Wanda</span>
          </h1>
          <p className="oew-hero-tag">
            Small-batch coffee, roasted by people who probably saw too much.
            <em> {tagline}</em>
          </p>
          <div className="oew-hero-ctas">
            <a href="#coffee" className="oew-btn oew-btn-flame">SHOP BEANS →</a>
            <a href="#story" className="oew-btn oew-btn-ghost">MEET WANDA</a>
          </div>
        </div>

        <div className="oew-hero-saint">
          <div className="oew-saint-frame">
            <WandaCat
              size={420}
              variant={blink ? 'sleep' : 'smug'}
              showHalo
              haloColor="var(--acid)"
              accent="var(--flame)"
            />
            <div className="oew-saint-banner oew-mono">PATRON SAINT OF MONDAYS</div>
          </div>
        </div>
      </div>

      {/* corner stickers */}
      <div className="oew-corner-stick top-right">
        <span className="oew-mono">SINCE SHE OPENED ONE EYE</span>
      </div>
      <div className="oew-corner-stick bot-left">
        <span className="oew-mono">↘ SCROLL · IF YOU DARE</span>
      </div>
    </section>
  )
}
