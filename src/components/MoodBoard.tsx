// Mood board — replaces the striped placeholder in the story section.
// A real fragmented grid of cats, coffee icons, color blocks, labels and
// numbers. Each tile tells a small piece of the brand story.
import { WandaCat } from './Wanda'
import { CoffeeIcon } from './CoffeeIcon'

export const MoodBoard = () => {
  return (
    <section className="oew-mood" id="moodboard">
      <header className="oew-section-head">
        <span className="oew-mono">I.5 · MOOD BOARD</span>
        <h2 className="oew-display-l">
          A roaster, a cat,
          <br />
          <span className="italic">and three good farms.</span>
        </h2>
        <p className="oew-section-tag">
          The brand sits at the intersection of small-batch craft, neighborhood ritual, and one
          very particular cat. Everything we make comes from here.
        </p>
      </header>

      <div className="oew-mood-grid">
        {/* Tile 1 — big Wanda, loaf pose */}
        <div className="oew-mood-tile span-2 row-2" style={{ background: 'var(--cream)' }}>
          <div className="oew-mood-label oew-mono">
            <span>01 · MASCOT</span>
            <span>WANDA · F · ~7 YR</span>
          </div>
          <div className="oew-mood-art">
            <WandaCat variant="loaf" size="100%" accent="var(--flame)" fur="var(--cream)" ink="var(--ink)" />
          </div>
          <div className="oew-mood-foot">
            <p className="italic">
              "Found on the back step in February '22, missing one eye and any sense of personal
              space."
            </p>
          </div>
        </div>

        {/* Tile 2 — flame color block + bean */}
        <div className="oew-mood-tile" style={{ background: 'var(--flame)', color: 'var(--cream)' }}>
          <div className="oew-mood-label oew-mono">
            <span>02 · PALETTE</span>
            <span>#FLAME</span>
          </div>
          <div className="oew-mood-art center">
            <CoffeeIcon name="bean" size={120} ink="var(--cream)" accent="var(--acid)" paper="var(--flame)" />
          </div>
          <div className="oew-mood-foot">
            <span className="oew-mono">FIRST CRACK</span>
          </div>
        </div>

        {/* Tile 3 — dripper */}
        <div className="oew-mood-tile" style={{ background: 'var(--cream)' }}>
          <div className="oew-mood-label oew-mono">
            <span>03 · METHOD</span>
          </div>
          <div className="oew-mood-art center">
            <CoffeeIcon name="dripper" size={150} ink="var(--ink)" accent="var(--flame)" paper="var(--cream)" />
          </div>
          <div className="oew-mood-foot">
            <p>V60. 1:16. Three minutes flat.</p>
          </div>
        </div>

        {/* Tile 4 — origins text */}
        <div className="oew-mood-tile" style={{ background: 'var(--ink)', color: 'var(--cream)' }}>
          <div className="oew-mood-label oew-mono">
            <span>04 · ORIGINS</span>
            <span>2026</span>
          </div>
          <ul className="oew-mood-list">
            <li><span className="oew-mono">ET ·</span> Hambela · Yirgacheffe</li>
            <li><span className="oew-mono">CO ·</span> Finca La Estrella · Huila</li>
            <li><span className="oew-mono">ID ·</span> Aceh · Gayo Highlands</li>
            <li><span className="oew-mono">MX ·</span> Chiapas · decaf, water-process</li>
          </ul>
          <div className="oew-mood-foot">
            <span className="oew-mono">FOUR GROWERS · ONE CONVERSATION</span>
          </div>
        </div>

        {/* Tile 5 — cherry */}
        <div className="oew-mood-tile" style={{ background: 'var(--acid)' }}>
          <div className="oew-mood-label oew-mono">
            <span>05 · FRUIT</span>
          </div>
          <div className="oew-mood-art center">
            <CoffeeIcon name="cherry" size={140} ink="var(--ink)" accent="var(--flame)" paper="var(--cream)" />
          </div>
          <div className="oew-mood-foot">
            <p>Coffee is a cherry. We forget. The growers don't.</p>
          </div>
        </div>

        {/* Tile 6 — kettle */}
        <div className="oew-mood-tile" style={{ background: 'var(--cream)' }}>
          <div className="oew-mood-label oew-mono">
            <span>06 · TOOLS</span>
          </div>
          <div className="oew-mood-art center">
            <CoffeeIcon name="kettle" size={140} ink="var(--ink)" accent="var(--flame)" paper="var(--cream)" />
          </div>
          <div className="oew-mood-foot">
            <p>Gooseneck only. Pour slow.</p>
          </div>
        </div>

        {/* Tile 7 — roaster + day label */}
        <div className="oew-mood-tile span-2" style={{ background: 'var(--cream)' }}>
          <div className="oew-mood-label oew-mono">
            <span>07 · ROAST DAY</span>
            <span>EVERY TUESDAY</span>
          </div>
          <div className="oew-mood-art center" style={{ flex: 1 }}>
            <CoffeeIcon name="roaster" size={180} ink="var(--ink)" accent="var(--flame)" paper="var(--cream)" />
          </div>
          <div className="oew-mood-foot">
            <p>
              <span className="oew-display-mood">1.2kg</span> drum · <span className="italic">tiny</span> by
              everyone's standards · the right size for our neighborhood
            </p>
          </div>
        </div>

        {/* Tile 8 — sparks + sun */}
        <div className="oew-mood-tile" style={{ background: 'var(--flame)', color: 'var(--cream)' }}>
          <div className="oew-mood-label oew-mono">
            <span>08 · 7 A.M.</span>
          </div>
          <div className="oew-mood-art center">
            <CoffeeIcon name="sun" size={140} ink="var(--cream)" accent="var(--acid)" paper="var(--flame)" />
          </div>
          <div className="oew-mood-foot">
            <span className="oew-mono">DOORS OPEN EARLY</span>
          </div>
        </div>

        {/* Tile 9 — wanda peek */}
        <div className="oew-mood-tile" style={{ background: 'var(--ink)' }}>
          <div className="oew-mood-label oew-mono" style={{ color: 'var(--cream)' }}>
            <span>09 · QC</span>
          </div>
          <div className="oew-mood-art center">
            <WandaCat variant="peek" size={170} accent="var(--flame)" fur="var(--cream)" ink="var(--ink)" />
          </div>
          <div className="oew-mood-foot" style={{ color: 'var(--cream)' }}>
            <p className="italic">She watches the roast.</p>
          </div>
        </div>

        {/* Tile 10 — beans */}
        <div className="oew-mood-tile" style={{ background: 'var(--cream)' }}>
          <div className="oew-mood-label oew-mono">
            <span>10 · STOCK</span>
          </div>
          <div className="oew-mood-art center">
            <CoffeeIcon name="beans" size={150} ink="var(--ink)" accent="var(--flame)" paper="var(--cream)" />
          </div>
          <div className="oew-mood-foot">
            <p>Bagged Tuesday. Best before twenty-eight days, drunk before fourteen.</p>
          </div>
        </div>

        {/* Tile 11 — quote */}
        <div className="oew-mood-tile span-2" style={{ background: 'var(--acid)' }}>
          <div className="oew-mood-label oew-mono">
            <span>11 · A REVIEW</span>
            <span>★ ★ ★ ★ ★</span>
          </div>
          <div className="oew-mood-quote">
            <span className="quote-mark">"</span>
            <p>
              Best coffee in <span className="italic">western mass.</span> The cat is a separate
              issue.
            </p>
            <span className="oew-mono">— A CUSTOMER, PROBABLY</span>
          </div>
        </div>

        {/* Tile 12 — sip wanda */}
        <div className="oew-mood-tile" style={{ background: 'var(--cream)' }}>
          <div className="oew-mood-label oew-mono">
            <span>12 · BREAK</span>
          </div>
          <div className="oew-mood-art center">
            <WandaCat variant="sip" size={170} accent="var(--flame)" fur="var(--cream)" ink="var(--ink)" />
          </div>
          <div className="oew-mood-foot">
            <p className="italic">No, she's not actually drinking it.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
