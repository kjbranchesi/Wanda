// Wholesale — editorial table of trade offerings beside a pull-quote and a
// tilted Wanda.
import { WandaCat } from './Wanda'

export const Wholesale = () => (
  <section className="oew-wholesale" id="wholesale">
    <div className="oew-ws-left">
      <p className="oew-mono small">V · FOR THE TRADE</p>
      <h2 className="oew-display-l">
        Wholesale.
        <br />
        <span className="italic">For the&nbsp;</span>
        <span className="acid">discerning</span>
        <span className="italic">.</span>
      </h2>
      <p className="oew-ws-blurb">
        Cafés, restaurants, weird little shops, and one barbershop in Northampton. We work with
        operators who care about how a cup tastes more than what their espresso machine costs.
      </p>

      <div className="oew-ws-table">
        <div className="oew-ws-row">
          <span className="oew-mono">5 LB BAG</span>
          <span>Direct, no minimums after the first order.</span>
        </div>
        <div className="oew-ws-row">
          <span className="oew-mono">DIAL-IN</span>
          <span>We show up. We make espresso. We don't leave until it's right.</span>
        </div>
        <div className="oew-ws-row">
          <span className="oew-mono">TRAINING</span>
          <span>Bar mechanics, brew programs, water chemistry, the works.</span>
        </div>
        <div className="oew-ws-row">
          <span className="oew-mono">CO-BRAND</span>
          <span>House blends with your name on them. Wanda on the back.</span>
        </div>
      </div>

      <a href="mailto:trade@oneeyedwanda.com" className="oew-btn oew-btn-flame big">
        TRADE@ONEEYEDWANDA.COM →
      </a>
    </div>

    <div className="oew-ws-right">
      <div className="oew-ws-quote">
        <span className="oew-mono">A REVIEW</span>
        <p className="oew-quote-text">
          "Best coffee in <span className="italic">western mass.</span> The cat is a separate
          issue."
        </p>
        <span className="oew-mono">— A CUSTOMER, PROBABLY</span>
      </div>
      <WandaCat size={260} variant="smug" rotate={-6} accent="var(--flame)" />
    </div>
  </section>
)
