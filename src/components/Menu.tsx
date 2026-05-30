// Coffee menu — four roasts, each staged as a packaging "can" with Wanda in a
// mood, a brewing-method badge, tasting-note chips, and a price.
import { WandaCat, type WandaVariant } from './Wanda'
import { CoffeeIcon } from './CoffeeIcon'

interface Roast {
  n: string
  name: string
  origin: string
  notes: string[]
  roast: string
  price: string
  mood: WandaVariant
  icon: string
}

const ROASTS: Roast[] = [
  {
    n: '01',
    name: 'SUSPICIOUS LIGHT',
    origin: 'Yirgacheffe, Ethiopia',
    notes: ['bergamot', 'jasmine', 'lemon pith'],
    roast: 'LIGHT',
    price: '$22',
    mood: 'suspicious',
    icon: 'dripper',
  },
  {
    n: '02',
    name: 'FERAL MEDIUM',
    origin: 'Huila, Colombia',
    notes: ['red plum', 'cocoa nib', 'brown sugar'],
    roast: 'MEDIUM',
    price: '$21',
    mood: 'scratch',
    icon: 'mug',
  },
  {
    n: '03',
    name: 'DARK ALLEY',
    origin: 'Sumatra · Aceh',
    notes: ['molasses', 'tobacco', 'leather'],
    roast: 'DARK',
    price: '$23',
    mood: 'yowl',
    icon: 'portafilter',
  },
  {
    n: '04',
    name: 'DECAF? IN THIS HOUSE?',
    origin: 'Decaf · Mexico',
    notes: ['maple', 'graham', 'warm milk'],
    roast: 'DECAF',
    price: '$24',
    mood: 'sleep',
    icon: 'cup',
  },
]

const RoastCard = ({ r, i }: { r: Roast; i: number }) => {
  const tilt = [-1.5, 1.5, -2, 1][i % 4]
  return (
    <article className="oew-roast" style={{ transform: `rotate(${tilt}deg)` }}>
      <div className="oew-roast-top">
        <span className="oew-mono">№ {r.n}</span>
        <span className="oew-mono">{r.roast}</span>
      </div>

      <div className="oew-roast-can">
        <div className="oew-can">
          <div className="oew-can-band">ONE EYED WANDA</div>
          <WandaCat size={140} variant={r.mood} accent="var(--flame)" />
          <div className="oew-can-name">{r.name}</div>
          <div className="oew-can-foot oew-mono">{r.origin}</div>
        </div>
        <div className="oew-roast-method">
          <CoffeeIcon name={r.icon} size={54} ink="var(--cream)" accent="var(--acid)" paper="var(--ink)" />
        </div>
      </div>

      <h3 className="oew-roast-name">{r.name}</h3>
      <p className="oew-roast-origin oew-mono">{r.origin}</p>
      <p className="oew-roast-notes">
        {r.notes.map((n, j) => (
          <span key={j} className="oew-note-chip">{n}</span>
        ))}
      </p>
      <div className="oew-roast-foot">
        <span className="oew-roast-price">{r.price}</span>
        <button className="oew-add">ADD →</button>
      </div>
    </article>
  )
}

export const Menu = () => (
  <section className="oew-menu" id="coffee">
    <header className="oew-section-head">
      <span className="oew-mono">II · THE COFFEE</span>
      <h2 className="oew-display-l">
        Four moods. <span className="italic">All hers.</span>
      </h2>
      <p className="oew-section-tag">
        Rotating single origins, roasted to order, named the morning after.
      </p>
    </header>

    <div className="oew-roast-grid">
      {ROASTS.map((r, i) => (
        <RoastCard r={r} i={i} key={r.n} />
      ))}
    </div>
  </section>
)
