// Instagram feed — six square tiles, each a colored card with a big Wanda and
// a caption. Backgrounds rotate through the palette.
import { WandaCat, type WandaVariant } from './Wanda'

interface FeedItem {
  c: string
  l: string
  n: string
  v: WandaVariant
  dark?: boolean
}

const FEED: FeedItem[] = [
  { c: 'var(--flame)', l: '@oneeyedwanda', n: 'ROAST DAY · LOT 017', v: 'smug' },
  { c: 'var(--ink)', l: 'REEL · 42K', n: 'SHE BIT THE GRINDER', v: 'yowl' },
  { c: 'var(--cream)', l: 'STILL', n: 'MORNING WINDOW', v: 'wink', dark: true },
  { c: 'var(--acid)', l: 'POSTER', n: 'DECAF DROP FRIDAY', v: 'sleep', dark: true },
  { c: 'var(--ink)', l: 'REEL · 18K', n: 'DIAL IN @ ABANDONED', v: 'scratch' },
  { c: 'var(--flame)', l: 'STORY', n: 'WHOLESALE GIG', v: 'smug' },
]

export const Feed = () => (
  <section className="oew-feed" id="feed">
    <header className="oew-section-head">
      <span className="oew-mono">VI · THE FEED</span>
      <h2 className="oew-display-l">
        Follow <span className="italic">@oneeyedwanda</span>
      </h2>
      <p className="oew-section-tag">Mostly roast day. Some cat. Occasional ghost.</p>
    </header>
    <div className="oew-feed-grid">
      {FEED.map((f, i) => (
        <div
          key={i}
          className="oew-feed-tile"
          style={{ background: f.c, color: f.dark ? 'var(--ink)' : 'var(--cream)' }}
        >
          <div className="oew-feed-top oew-mono">
            <span>{f.l}</span>
            <span>↗</span>
          </div>
          <div className="oew-feed-cat">
            <WandaCat
              size={170}
              variant={f.v}
              ink={f.dark ? 'var(--ink)' : 'var(--cream)'}
              accent={f.dark ? 'var(--flame)' : 'var(--ink)'}
            />
          </div>
          <div className="oew-feed-foot oew-mono">{f.n}</div>
        </div>
      ))}
    </div>
  </section>
)
