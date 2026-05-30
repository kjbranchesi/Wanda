// Subscription / "The Cult" — a loud poster panel beside the membership pitch.
import { WandaStamp } from './Wanda'

export const Cult = () => (
  <section className="oew-cult" id="cult">
    <div className="oew-cult-poster">
      <div className="oew-cult-meta oew-mono">
        <span>MEMBERSHIP №</span>
        <span>OPEN ENROLLMENT</span>
      </div>
      <h2 className="oew-display-xl">
        JOIN
        <br />
        <span className="italic outline">Wanda's</span>
        <br />
        CULT
      </h2>
      <div className="oew-cult-eyes">
        <WandaStamp size={140} color="var(--cream)" knockout="var(--ink)" rotate={-6} />
        <WandaStamp size={140} color="var(--cream)" knockout="var(--ink)" rotate={6} />
        <WandaStamp size={140} color="var(--cream)" knockout="var(--ink)" rotate={-3} />
      </div>
    </div>

    <div className="oew-cult-body">
      <p className="oew-mono small">III · THE SUBSCRIPTION</p>
      <h3 className="oew-display-m">
        12 oz, every two weeks.
        <br />
        <span className="italic">No questions asked.</span>
      </h3>
      <ul className="oew-cult-bullets">
        <li>Rotating roast picked by Wanda (and us)</li>
        <li>Skip, swap, or run for the hills anytime</li>
        <li>First bag ships with a sticker pack &amp; a riso print</li>
        <li>Members-only roasts on the fourteenth of each month</li>
      </ul>
      <div className="oew-cult-cta">
        <div className="oew-cult-price">
          <span className="oew-mono">FROM</span>
          <span className="oew-cult-num">$19</span>
          <span className="oew-mono">/ DROP</span>
        </div>
        <a href="#" className="oew-btn oew-btn-flame big">ENROLL ↘</a>
      </div>
    </div>
  </section>
)
