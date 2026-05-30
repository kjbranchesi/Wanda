// Brand system artboards — the cards that populate the design canvas.
// Reuse the canonical geometric Wanda from the landing page so the system
// stays in sync. (The prototype's hand-drawn comparison artboards are dropped:
// the hand-drawn variant was retired — geometric is the only canonical mark.)
import { WandaCat, WandaStamp } from '../components/Wanda'

const P = {
  ink: '#0E0E0E',
  cream: '#F7F4ED',
  flame: '#FF4D2E',
  acid: '#B8FF3D',
}

// ── Logo lockup ───────────────────────────────────────────────────────────────
export const BSLogo = () => (
  <div className="bs-card" style={{ background: P.cream }}>
    <div className="bs-card-meta">01 · PRIMARY MARK</div>
    <div className="bs-logo-stage">
      <div className="bs-logo-primary">
        <WandaCat size={260} variant="smug" showHalo haloColor={P.acid} accent={P.flame} />
        <div className="bs-logotype">
          <div>ONE EYED</div>
          <div className="bs-logotype-italic">Wanda</div>
          <div className="bs-logotype-rule" />
          <div className="bs-logotype-mono">COFFEE ROASTERS · WILBRAHAM MA</div>
        </div>
      </div>
    </div>
    <div className="bs-card-foot">
      <div>FULL LOCKUP — for hero, packaging front, signage</div>
    </div>
  </div>
)

// ── Mark variations ─────────────────────────────────────────────────────────
export const BSMarks = () => (
  <div className="bs-card" style={{ background: P.cream }}>
    <div className="bs-card-meta">02 · MARK VARIATIONS</div>
    <div className="bs-marks-grid">
      <div className="bs-mark-cell">
        <WandaCat size={140} variant="smug" accent={P.flame} />
        <span className="bs-mono">SMUG · default</span>
      </div>
      <div className="bs-mark-cell">
        <WandaCat size={140} variant="wink" accent={P.flame} />
        <span className="bs-mono">WINK · social</span>
      </div>
      <div className="bs-mark-cell">
        <WandaCat size={140} variant="yowl" accent={P.flame} />
        <span className="bs-mono">YOWL · dark roasts</span>
      </div>
      <div className="bs-mark-cell">
        <WandaCat size={140} variant="sleep" accent={P.flame} />
        <span className="bs-mono">SLEEP · decaf</span>
      </div>
      <div className="bs-mark-cell">
        <WandaCat size={140} variant="scratch" accent={P.flame} />
        <span className="bs-mono">SCRATCH · merch</span>
      </div>
      <div className="bs-mark-cell" style={{ background: P.ink }}>
        <WandaStamp size={140} color={P.cream} knockout={P.ink} />
        <span className="bs-mono" style={{ color: P.cream }}>
          STAMP · monochrome
        </span>
      </div>
    </div>
  </div>
)

// ── Palette ───────────────────────────────────────────────────────────────────
export const BSPalette = () => {
  const swatches = [
    { name: 'INK', hex: P.ink, role: 'Type, ground, structure', dark: true },
    { name: 'CREAM', hex: P.cream, role: 'Page, paper, breath', dark: false },
    { name: 'FLAME', hex: P.flame, role: 'Voice · CTAs, accents', dark: true },
    { name: 'ACID', hex: P.acid, role: 'Pop · highlights, halos', dark: false },
  ]
  return (
    <div className="bs-card" style={{ background: P.cream }}>
      <div className="bs-card-meta">03 · PALETTE</div>
      <div className="bs-pal-grid">
        {swatches.map((s) => (
          <div key={s.hex} className="bs-pal-card" style={{ background: s.hex, color: s.dark ? P.cream : P.ink }}>
            <div className="bs-pal-name">{s.name}</div>
            <div className="bs-pal-role">{s.role}</div>
            <div className="bs-pal-hex bs-mono">{s.hex.toUpperCase()}</div>
          </div>
        ))}
      </div>

      <div className="bs-card-meta" style={{ marginTop: 24 }}>
        SECONDARY PALETTES
      </div>
      <div className="bs-pal-alts">
        {[
          { name: 'ITALIAN RED', colors: ['#E63946', '#2A9D8F', '#1D3557', '#F4E9D8'] },
          { name: 'AMBER HAZE', colors: ['#FF6B35', '#FFD23F', '#181100', '#FFF8EE'] },
          { name: 'ESPRESSO & OLIVE', colors: ['#D4581E', '#7A8B5C', '#3A2618', '#EAE6DD'] },
          { name: 'WISTERIA', colors: ['#E8A33D', '#6B4F8C', '#2B2B2B', '#F2EDE4'] },
        ].map((p) => (
          <div key={p.name} className="bs-pal-alt">
            <div className="bs-mono">{p.name}</div>
            <div className="bs-pal-alt-row">
              {p.colors.map((c) => (
                <div key={c} className="bs-pal-alt-chip" style={{ background: c }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Typography ─────────────────────────────────────────────────────────────────
export const BSType = () => (
  <div className="bs-card" style={{ background: P.cream }}>
    <div className="bs-card-meta">04 · TYPOGRAPHY</div>

    <div className="bs-type-row">
      <div className="bs-type-label">
        <div className="bs-mono">DISPLAY</div>
        <div>Big Shoulders Display 900</div>
      </div>
      <div
        className="bs-type-sample"
        style={{ fontFamily: "'Big Shoulders Display'", fontWeight: 900, fontSize: 120, lineHeight: 0.85, textTransform: 'uppercase', letterSpacing: '-0.015em' }}
      >
        SMUG, FERAL,
        <br />
        ELEGANT.
      </div>
    </div>

    <div className="bs-type-row">
      <div className="bs-type-label">
        <div className="bs-mono">EDITORIAL ITALIC</div>
        <div>Instrument Serif Italic</div>
      </div>
      <div className="bs-type-sample" style={{ fontFamily: "'Instrument Serif'", fontStyle: 'italic', fontSize: 96, lineHeight: 1 }}>
        She knows your <span style={{ color: P.flame }}>order.</span>
      </div>
    </div>

    <div className="bs-type-row">
      <div className="bs-type-label">
        <div className="bs-mono">BODY</div>
        <div>Space Grotesk 400 / 500</div>
      </div>
      <div className="bs-type-sample" style={{ fontFamily: "'Space Grotesk'", fontSize: 20, lineHeight: 1.45, maxWidth: 640 }}>
        Small-batch coffee, roasted by people who probably saw too much. We work with growers we actually know, in
        batches small enough to count, and we name our roasts after the moods Wanda has inflicted on us over the years.
      </div>
    </div>

    <div className="bs-type-row">
      <div className="bs-type-label">
        <div className="bs-mono">UTILITY MONO</div>
        <div>Space Mono 400</div>
      </div>
      <div className="bs-type-sample bs-mono" style={{ fontSize: 14, letterSpacing: '0.16em' }}>
        EST. 2026 · WILBRAHAM, MA · LOT №017 · ROASTED TUESDAY
      </div>
    </div>

    <div className="bs-type-scale">
      {[
        { l: 'H1 · Hero', s: 'Wanda', f: "'Instrument Serif'", style: { fontStyle: 'italic' as const }, fs: 88 },
        { l: 'H1 · Display', s: 'ONE EYED', f: "'Big Shoulders Display'", style: { fontWeight: 900, textTransform: 'uppercase' as const }, fs: 80 },
        { l: 'H2 · Section', s: 'Four moods.', f: "'Big Shoulders Display'", style: { fontWeight: 900, textTransform: 'uppercase' as const }, fs: 56 },
        { l: 'H3 · Card', s: 'Suspicious Light', f: "'Big Shoulders Display'", style: { fontWeight: 900, textTransform: 'uppercase' as const }, fs: 28 },
        { l: 'Body L', s: 'Patron saint of mondays.', f: "'Space Grotesk'", style: { fontWeight: 400 }, fs: 20 },
        { l: 'Body', s: 'She lost an eye. We found a roast.', f: "'Space Grotesk'", style: { fontWeight: 400 }, fs: 16 },
        { l: 'Caption', s: 'EST. 2026 · WILBRAHAM MA', f: "'Space Mono'", style: { letterSpacing: '0.14em', textTransform: 'uppercase' as const }, fs: 11 },
      ].map((r, i) => (
        <div key={i} className="bs-scale-row">
          <span className="bs-mono">{r.l}</span>
          <span style={{ fontFamily: r.f, fontSize: r.fs, lineHeight: 1, ...r.style }}>{r.s}</span>
        </div>
      ))}
    </div>
  </div>
)

// ── Voice ───────────────────────────────────────────────────────────────────
export const BSVoice = () => (
  <div className="bs-card" style={{ background: P.cream }}>
    <div className="bs-card-meta">05 · VOICE & COPY</div>
    <div className="bs-voice-grid">
      <div>
        <div className="bs-mono">PRINCIPLES</div>
        <ul className="bs-voice-list">
          <li><span className="bs-mono">×</span> Bone-dry, never cruel.</li>
          <li><span className="bs-mono">×</span> Specific over clever — Yirgacheffe before "exotic notes".</li>
          <li><span className="bs-mono">×</span> Wanda is a real cat. Talk about her like one.</li>
          <li><span className="bs-mono">×</span> Confident, mildly suspicious of the reader.</li>
        </ul>
      </div>
      <div>
        <div className="bs-mono">PHRASES IN ROTATION</div>
        <ul className="bs-voice-list">
          <li>"Roasted by people who probably saw too much."</li>
          <li>"She lost an eye. We found a roast."</li>
          <li>"Patron saint of Mondays."</li>
          <li>"Decaf? In this house?"</li>
        </ul>
      </div>
      <div>
        <div className="bs-mono">DO</div>
        <ul className="bs-voice-list">
          <li>· Name moods, name farms, name dates.</li>
          <li>· Use mono for receipts, banners, lot numbers.</li>
          <li>· Let italic serif do the soft talking.</li>
        </ul>
      </div>
      <div>
        <div className="bs-mono">DON'T</div>
        <ul className="bs-voice-list">
          <li>· "Artisanal," "crafted," "passion."</li>
          <li>· Cat puns. We are above this. (Mostly.)</li>
          <li>· Gradients. Stamps, not gradients.</li>
        </ul>
      </div>
    </div>
  </div>
)

// ── Packaging ─────────────────────────────────────────────────────────────────
export const BSPackaging = () => (
  <div className="bs-card" style={{ background: P.cream }}>
    <div className="bs-card-meta">06 · PACKAGING</div>
    <div className="bs-pkg-row">
      {[
        { name: 'SUSPICIOUS LIGHT', roast: 'LIGHT', color: P.flame, mood: 'smug' as const, inverse: false, darkText: false },
        { name: 'FERAL MEDIUM', roast: 'MEDIUM', color: P.ink, mood: 'scratch' as const, inverse: true, darkText: false },
        { name: 'DARK ALLEY', roast: 'DARK', color: P.acid, mood: 'yowl' as const, inverse: false, darkText: true },
      ].map((p) => (
        <div key={p.name} className="bs-can-wrap">
          <div className="bs-can" style={{ background: p.color }}>
            <div
              className="bs-can-band"
              style={{
                background: p.inverse ? P.cream : P.ink,
                color: p.inverse ? P.ink : P.cream,
              }}
            >
              ONE EYED WANDA · {p.roast}
            </div>
            <WandaCat size={170} variant={p.mood} accent={P.flame} ink={P.ink} fur={P.cream} />
            <div className="bs-can-name" style={{ color: p.darkText ? P.ink : P.cream }}>
              {p.name}
            </div>
            <div className="bs-can-meta bs-mono" style={{ color: p.darkText ? P.ink : P.cream }}>
              250G · WHOLE BEAN
            </div>
          </div>
          <div className="bs-pkg-caption bs-mono">{p.name}</div>
        </div>
      ))}
    </div>
  </div>
)

// ── Stationery ─────────────────────────────────────────────────────────────────
export const BSStationery = () => (
  <div className="bs-card" style={{ background: P.cream }}>
    <div className="bs-card-meta">07 · STATIONERY</div>
    <div className="bs-stat-row">
      <div className="bs-card-biz" style={{ background: P.ink, color: P.cream }}>
        <div className="bs-mono" style={{ color: P.acid }}>
          FRONT
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <WandaStamp size={80} color={P.cream} knockout={P.ink} />
          <div>
            <div style={{ fontFamily: "'Big Shoulders Display'", fontWeight: 900, fontSize: 28, lineHeight: 0.9, textTransform: 'uppercase' }}>
              ONE EYED
              <br />
              <span style={{ fontFamily: "'Instrument Serif'", fontStyle: 'italic', color: P.flame, fontWeight: 400 }}>Wanda</span>
            </div>
          </div>
        </div>
        <div style={{ fontFamily: 'Space Mono', fontSize: 9, letterSpacing: '0.12em' }}>COFFEE ROASTERS · WILBRAHAM, MA</div>
      </div>

      <div className="bs-card-biz" style={{ background: P.cream, color: P.ink, border: `2px solid ${P.ink}` }}>
        <div className="bs-mono">BACK</div>
        <div>
          <div style={{ fontFamily: "'Big Shoulders Display'", fontWeight: 900, fontSize: 22, lineHeight: 1, textTransform: 'uppercase' }}>FIONA HARDWICK</div>
          <div style={{ fontFamily: 'Space Mono', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: 2 }}>HEAD ROASTER · DIRECTOR OF SNACKS</div>
        </div>
        <div style={{ fontFamily: 'Space Mono', fontSize: 10, letterSpacing: '0.1em' }}>
          fiona@oneeyedwanda.com
          <br />
          +1 413 555 0117
          <br />
          47 Main · Wilbraham MA
        </div>
      </div>

      <div className="bs-card-biz" style={{ background: P.flame, color: P.cream, justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ fontFamily: "'Big Shoulders Display'", fontWeight: 900, fontSize: 64, lineHeight: 0.85, textTransform: 'uppercase' }}>
          SHE
          <br />
          KNOWS.
        </div>
        <div className="bs-mono" style={{ color: P.cream }}>
          STICKER · 2.5" CIRCLE
        </div>
      </div>
    </div>
  </div>
)

// ── Poster ──────────────────────────────────────────────────────────────────
export const BSPoster = () => (
  <div className="bs-card" style={{ background: P.cream, padding: 0, overflow: 'hidden' }}>
    <div className="bs-card-meta" style={{ position: 'absolute', left: 24, top: 16, zIndex: 5 }}>
      08 · POSTER · IN-CAFE
    </div>
    <div className="bs-poster">
      <div className="bs-poster-meta bs-mono">
        <span>POSTER №001</span>
        <span>11 × 17"</span>
      </div>
      <div className="bs-poster-art">
        {/* inverted for the dark poster: cream linework over an ink body */}
        <WandaCat size={520} variant="smug" showHalo haloColor={P.acid} accent={P.flame} ink={P.cream} fur={P.ink} />
        <div className="bs-poster-banner">PATRON SAINT OF MONDAYS</div>
      </div>
      <div className="bs-poster-foot bs-mono">EST. WILBRAHAM · 2026 · BLESSED BE THE BEAN</div>
    </div>
  </div>
)

// ── Signage / awning ──────────────────────────────────────────────────────────
export const BSSignage = () => (
  <div className="bs-card" style={{ background: P.cream }}>
    <div className="bs-card-meta">09 · CAFE SIGNAGE</div>
    <div className="bs-awning">
      <div className="bs-awning-stripes">
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={i} style={{ background: i % 2 === 0 ? P.flame : P.cream }} />
        ))}
      </div>
      <div className="bs-awning-name">
        <div style={{ fontFamily: "'Big Shoulders Display'", fontWeight: 900, fontSize: 96, lineHeight: 0.85, textTransform: 'uppercase' }}>
          ONE EYED <span style={{ fontFamily: "'Instrument Serif'", fontStyle: 'italic', color: P.flame, fontWeight: 400 }}>Wanda</span>
        </div>
        <div className="bs-mono" style={{ fontSize: 12, marginTop: 6 }}>
          COFFEE · WILBRAHAM · MASSACHUSETTS
        </div>
      </div>
    </div>

    <div className="bs-signage-row">
      <div className="bs-sign-pill" style={{ background: P.ink, color: P.cream }}>
        <span className="bs-mono">OPEN</span>
        <span style={{ fontFamily: "'Big Shoulders Display'", fontWeight: 900, fontSize: 36 }}>7AM</span>
      </div>
      <div className="bs-sign-pill" style={{ background: P.acid }}>
        <span className="bs-mono">SHE'S IN.</span>
      </div>
      <div className="bs-sign-pill" style={{ background: P.flame, color: P.cream }}>
        <span className="bs-mono">ROAST</span>
        <span style={{ fontFamily: "'Big Shoulders Display'", fontWeight: 900, fontSize: 36 }}>TUE</span>
      </div>
    </div>
  </div>
)

// ── Social ──────────────────────────────────────────────────────────────────
export const BSSocial = () => (
  <div className="bs-card" style={{ background: P.cream }}>
    <div className="bs-card-meta">10 · SOCIAL TEMPLATES</div>
    <div className="bs-social-grid">
      <div className="bs-soc" style={{ background: P.flame }}>
        <div className="bs-mono" style={{ color: P.cream }}>
          @oneeyedwanda · POST
        </div>
        <div style={{ fontFamily: "'Big Shoulders Display'", fontWeight: 900, fontSize: 56, lineHeight: 0.85, textTransform: 'uppercase', color: P.cream }}>
          ROAST
          <br />
          DAY
          <br />
          TUE
        </div>
        <WandaStamp size={100} color={P.ink} style={{ position: 'absolute', right: 10, bottom: 10 }} />
      </div>
      <div className="bs-soc" style={{ background: P.ink, color: P.cream }}>
        <div className="bs-mono" style={{ color: P.acid }}>
          @oneeyedwanda · REEL COVER
        </div>
        <WandaCat size={170} variant="yowl" accent={P.flame} ink={P.cream} fur={P.ink} />
        <div style={{ fontFamily: "'Big Shoulders Display'", fontWeight: 900, fontSize: 28, textTransform: 'uppercase', color: P.cream }}>
          DIAL-IN
          <br />
          WITH WANDA
        </div>
      </div>
      <div className="bs-soc" style={{ background: P.acid }}>
        <div className="bs-mono">@oneeyedwanda · STORY</div>
        <div style={{ fontFamily: "'Instrument Serif'", fontStyle: 'italic', fontSize: 60, lineHeight: 1, color: P.ink }}>
          "Best coffee in <span style={{ color: P.flame }}>western mass.</span>"
        </div>
        <div className="bs-mono">— A CUSTOMER, PROBABLY</div>
      </div>
    </div>
  </div>
)
