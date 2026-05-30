// Story / About — editorial chapter with a vertical aside, two-column body,
// numbered facts, and a "photo" frame staging Wanda peeking at the roaster.
import { WandaCat } from './Wanda'
import { CoffeeIcon } from './CoffeeIcon'

export const Story = () => (
  <section className="oew-story" id="story">
    <div className="oew-story-aside oew-mono">
      <span>CHAPTER ONE</span>
      <span>· · ·</span>
      <span>WANDA, BRIEFLY</span>
    </div>

    <div className="oew-story-body">
      <p className="oew-story-eyebrow oew-mono">A BIOGRAPHY IN THREE GLANCES</p>
      <h2 className="oew-display-l">
        She lost <span className="italic">an eye.</span>
        <br />
        We found <span className="flame">a roast.</span>
      </h2>

      <div className="oew-story-cols">
        <p>
          Wanda turned up at the back door of a barn in Wilbraham in February 2022, missing one eye
          and any sense of personal space. She has since appointed herself{' '}
          <em>director of quality control,</em> a role she performs primarily by watching the
          roaster with terrifying intensity.
        </p>
        <p>
          Our beans are sourced from growers we actually know, roasted in batches small enough to
          count, and named after the moods Wanda has inflicted on us over the years. If a bag tastes
          a little feral, that's intentional. She approves the cuppings.
        </p>
      </div>

      <ul className="oew-story-facts">
        <li><span className="oew-mono">01 ·</span> Roasted Tuesday, shipped Wednesday.</li>
        <li><span className="oew-mono">02 ·</span> Direct trade with three farms in Huila & Yirgacheffe.</li>
        <li><span className="oew-mono">03 ·</span> Compostable bags. Recyclable cans. Smug cat.</li>
      </ul>
    </div>

    <div className="oew-story-photo">
      <div className="oew-photo-frame">
        <div className="oew-mono oew-photo-label">FIG. 01 · ON THE ROASTER</div>
        <div className="oew-photo-scene">
          <CoffeeIcon name="roaster" size={180} ink="var(--ink)" accent="var(--flame)" paper="var(--cream)" />
          <div className="oew-photo-cat">
            <WandaCat variant="peek" size={140} accent="var(--flame)" fur="var(--cream)" ink="var(--ink)" />
          </div>
        </div>
        <div className="oew-mono oew-photo-foot">QUALITY CONTROL · TUESDAY · 11:42 A.M.</div>
      </div>
    </div>
  </section>
)
