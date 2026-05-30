// Footer — contact columns, a newsletter capture, and a giant outlined
// wordmark band.
export const Footer = () => (
  <footer className="oew-footer">
    <div className="oew-footer-grid">
      <div className="oew-foot-block big">
        <h3 className="oew-display-m">
          ONE EYED
          <br />
          <span className="italic">Wanda</span>
        </h3>
        <p className="oew-mono">COFFEE ROASTERS · WILBRAHAM, MA</p>
      </div>
      <div className="oew-foot-block">
        <p className="oew-mono">FIND US</p>
        <p>
          47 Main Street
          <br />
          Wilbraham, MA 01095
          <br />
          Open Wed–Sun · 7a–2p
        </p>
      </div>
      <div className="oew-foot-block">
        <p className="oew-mono">WRITE US</p>
        <p>
          hello@oneeyedwanda.com
          <br />
          trade@oneeyedwanda.com
          <br />
          press@oneeyedwanda.com
        </p>
      </div>
      <div className="oew-foot-block">
        <p className="oew-mono">NEWSLETTER</p>
        <form className="oew-news" onSubmit={(e) => e.preventDefault()}>
          <input placeholder="your@email" />
          <button>→</button>
        </form>
        <p className="small">Monthly. Never gross.</p>
      </div>
    </div>

    <div className="oew-footer-huge">ONEEYEDWANDA</div>

    <div className="oew-footer-fine">
      <span className="oew-mono">© 2026 ONE EYED WANDA COFFEE CO.</span>
      <span className="oew-mono">SITE BY THE CAT</span>
      <a href="brand-system.html" className="oew-mono">BRAND SYSTEM →</a>
    </div>
  </footer>
)
