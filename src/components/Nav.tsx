import { WandaStamp } from './Wanda'

export const Nav = () => (
  <nav className="oew-nav">
    <div className="oew-nav-logo">
      <WandaStamp size={34} color="var(--ink)" />
      <span>ONE EYED WANDA</span>
    </div>
    <ul className="oew-nav-links">
      <li><a href="#story">Story</a></li>
      <li><a href="#coffee">Coffee</a></li>
      <li><a href="#cult">The Cult</a></li>
      <li><a href="#wholesale">Wholesale</a></li>
      <li><a href="#feed">Feed</a></li>
    </ul>
    <div className="oew-nav-cart">
      <span className="oew-mono">CART · 0</span>
      <a href="#shop" className="oew-cta-pill">SHOP →</a>
    </div>
  </nav>
)
