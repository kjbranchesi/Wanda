// Wanda — flat-illustration cat with a confident dark outline.
// Every fur shape carries a 4px ink stroke so she reads on flame, cream,
// ink, anywhere. Proportions are chibi/dumpling: a big round head with puffy
// cheeks over a small body — the "chubby cute" pass the user landed on.
//
// Variants: sit | loaf | peek | grump | stretch | walk | sip
// Old names (smug, wink, yowl, sleep, scratch) are mapped via WandaCat so
// existing call sites keep working.
import type { CSSProperties, ReactElement } from 'react'

const STROKE = 4
const STROKE_FINE = 2.4

export type WandaVariant =
  | 'sit'
  | 'loaf'
  | 'peek'
  | 'stretch'
  | 'grump'
  | 'walk'
  | 'sip'
  // legacy aliases
  | 'smug'
  | 'wink'
  | 'yowl'
  | 'sleep'
  | 'scratch'

type CanonicalVariant = 'sit' | 'loaf' | 'peek' | 'stretch' | 'grump' | 'walk' | 'sip'

type FaceEye = 'open' | 'closed' | 'squint'
type FaceMouth = 'smirk' | 'frown' | 'yawn' | 'sip' | 'flat'

interface FaceProps {
  ink: string
  fur: string
  accent: string
  eye?: FaceEye
  mouth?: FaceMouth
}

// Shared face features. Position assumes the head is centered at (120, 118)
// with rx≈62, ry≈54. Each variant tweaks `eye` and `mouth`.
//
// Style notes ("cute" pass):
// - Round, bright eye with a fat sparkle (anime/chibi feel)
// - Softer, smaller X so the missing eye reads playful, not gory
// - Tiny ":3" mouth, small accent nose
// - Pink cheek blushes for extra softness
const Face = ({ ink, fur, accent, eye = 'open', mouth = 'smirk' }: FaceProps) => (
  <g>
    {/* ─── CHEEK BLUSH — pushed out to the puffy cheeks ─── */}
    <g opacity="0.6">
      <ellipse cx="70" cy="144" rx="11" ry="6" fill={accent} />
      <ellipse cx="170" cy="144" rx="11" ry="6" fill={accent} />
    </g>

    {/* ─── GOOD EYE (viewer-left) ─── */}
    {eye === 'closed' ? (
      <path
        d="M 86 112 Q 102 102 118 112"
        fill="none"
        stroke={ink}
        strokeWidth={STROKE}
        strokeLinecap="round"
      />
    ) : eye === 'squint' ? (
      <path
        d="M 86 114 Q 102 120 118 114"
        fill="none"
        stroke={ink}
        strokeWidth={STROKE}
        strokeLinecap="round"
      />
    ) : (
      <g>
        {/* big round eye with a chunky sparkle — the "cute" anchor */}
        <circle cx="100" cy="112" r="12" fill={ink} />
        <circle cx="104" cy="107" r="4.5" fill={fur} />
        <circle cx="96" cy="116" r="1.8" fill={fur} />
      </g>
    )}

    {/* ─── MISSING EYE — softer X (viewer-right) ─── */}
    <g stroke={ink} strokeWidth={STROKE + 0.2} strokeLinecap="round">
      <line x1="134" y1="104" x2="154" y2="122" />
      <line x1="154" y1="104" x2="134" y2="122" />
    </g>

    {/* ─── NOSE — tiny accent triangle ─── */}
    <path
      d="M 116 132 Q 120 130 124 132 Q 122 138 120 138 Q 118 138 116 132 Z"
      fill={accent}
      stroke={ink}
      strokeWidth={STROKE_FINE - 0.6}
      strokeLinejoin="round"
    />

    {/* ─── MOUTH ─── */}
    {mouth === 'sip' ? (
      <ellipse cx="120" cy="148" rx="3.8" ry="3" fill={ink} />
    ) : mouth === 'yawn' ? (
      <g>
        <ellipse cx="120" cy="150" rx="8" ry="6.5" fill={ink} stroke={ink} strokeWidth={STROKE_FINE} />
        <ellipse cx="120" cy="152" rx="2.8" ry="1.8" fill={accent} />
      </g>
    ) : mouth === 'frown' ? (
      <path
        d="M 110 152 Q 120 144 130 152"
        fill="none"
        stroke={ink}
        strokeWidth={STROKE - 0.5}
        strokeLinecap="round"
      />
    ) : mouth === 'flat' ? (
      <path d="M 112 148 L 128 148" stroke={ink} strokeWidth={STROKE - 0.5} strokeLinecap="round" />
    ) : (
      // ":3" — cute cat smile, two soft curves meeting at the nose tip
      <g fill="none" stroke={ink} strokeWidth={STROKE - 0.5} strokeLinecap="round">
        <path d="M 120 142 Q 116 152 108 148" />
        <path d="M 120 142 Q 124 152 132 148" />
      </g>
    )}

    {/* ─── WHISKERS — short, peeking out from puffy cheeks ─── */}
    <g stroke={ink} strokeWidth="1.6" strokeLinecap="round" opacity="0.65" fill="none">
      <path d="M 56 142 Q 70 144 84 146" />
      <path d="M 56 150 Q 70 150 84 152" />
      <path d="M 184 142 Q 170 144 156 146" />
      <path d="M 184 150 Q 170 150 156 152" />
    </g>
  </g>
)

export interface WandaProps {
  size?: number | string
  variant?: CanonicalVariant
  ink?: string
  fur?: string
  accent?: string
  belly?: string | null
  rotate?: number
  showHalo?: boolean
  haloColor?: string
  style?: CSSProperties
  className?: string
}

const Wanda = ({
  size = 200,
  variant = 'sit',
  ink = '#0E0E0E',
  fur = '#F7F4ED',
  accent = '#FF4D2E',
  belly = null,
  rotate = 0,
  showHalo = false,
  haloColor = '#B8FF3D',
  style = {},
  className = '',
}: WandaProps) => {
  const bellyColor = belly ?? 'rgba(0,0,0,0.08)'

  const VB = '0 0 240 240'

  // Halo — drawn first, behind everything
  const halo = showHalo ? (
    <g>
      <ellipse cx="120" cy="56" rx="80" ry="14" fill="none" stroke={haloColor} strokeWidth="9" />
      <ellipse cx="120" cy="56" rx="80" ry="14" fill="none" stroke={ink} strokeWidth="1.8" />
    </g>
  ) : null

  // Inner-ear color (drawn after silhouette to layer on top of fur)
  const innerEars = (
    <g>
      <path d="M 78 50 L 70 22 L 92 56 Z" fill={accent} stroke={ink} strokeWidth={STROKE_FINE} strokeLinejoin="round" />
      <path d="M 162 50 L 170 22 L 148 56 Z" fill={accent} stroke={ink} strokeWidth={STROKE_FINE} strokeLinejoin="round" />
    </g>
  )

  // ─────────────── BODY VARIANTS ───────────────
  // Each variant draws a single continuous fur silhouette (so the outline
  // wraps cleanly) plus interior details (belly shadow, paw lines).

  let silhouette: ReactElement | null
  let interior: ReactElement | null = null
  let face = <Face ink={ink} fur={fur} accent={accent} eye="open" mouth="smirk" />

  if (variant === 'sit') {
    // SIT — chibi proportions: big round head with puffy cheeks, small body.
    silhouette = (
      <path
        d="
          M 70 22
          L 88 58
          Q 120 44 152 58
          L 170 22
          Q 178 16 178 36
          L 172 62
          Q 198 88 198 138
          Q 198 180 170 188
          Q 188 222 146 228
          Q 120 234 94 228
          Q 52 222 70 188
          Q 42 180 42 138
          Q 42 88 68 62
          L 62 36
          Q 62 16 70 22
          Z
        "
        fill={fur}
        stroke={ink}
        strokeWidth={STROKE}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    )
    interior = (
      <g>
        {/* belly shadow — smaller, sits in the little body */}
        <path d="M 96 200 Q 120 226 144 200 Q 144 228 120 230 Q 96 228 96 200 Z" fill={bellyColor} />
        {/* paw divider */}
        <path d="M 120 222 L 120 232" stroke={ink} strokeWidth="2.4" strokeLinecap="round" opacity="0.7" />
        {/* tail behind body */}
        <path
          d="M 178 210 Q 224 204 222 162 Q 220 142 200 146"
          fill="none"
          stroke={fur}
          strokeWidth="22"
          strokeLinecap="round"
        />
        <path
          d="M 178 210 Q 224 204 222 162 Q 220 142 200 146"
          fill="none"
          stroke={ink}
          strokeWidth={STROKE}
          strokeLinecap="round"
        />
      </g>
    )
  } else if (variant === 'loaf') {
    // LOAF — chubby head sits on a small bread base. Eyes closed.
    silhouette = (
      <path
        d="
          M 70 22
          L 88 60
          Q 120 46 152 60
          L 170 22
          Q 178 16 178 36
          L 172 64
          Q 198 88 198 140
          Q 198 178 192 196
          Q 192 222 120 222
          Q 48 222 48 196
          Q 42 178 42 140
          Q 42 88 68 64
          L 62 36
          Q 62 16 70 22
          Z
        "
        fill={fur}
        stroke={ink}
        strokeWidth={STROKE}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    )
    interior = (
      <path d="M 76 196 Q 120 214 164 196 Q 164 220 120 222 Q 76 220 76 196 Z" fill={bellyColor} />
    )
    face = <Face ink={ink} fur={fur} accent={accent} eye="closed" mouth="smirk" />
  } else if (variant === 'peek') {
    // PEEK — head over a counter. Just head + paws.
    silhouette = (
      <g>
        {/* counter line */}
        <rect x="0" y="198" width="240" height="42" fill={ink} />
        {/* head only */}
        <path
          d="
            M 70 22
            L 90 62
            Q 120 52 150 62
            L 170 22
            Q 178 16 178 36
            L 174 72
            Q 184 88 184 128
            Q 184 170 120 178
            Q 56 170 56 128
            Q 56 88 66 72
            L 62 36
            Q 62 16 70 22
            Z
          "
          fill={fur}
          stroke={ink}
          strokeWidth={STROKE}
          strokeLinejoin="round"
        />
        {/* paws gripping the counter edge */}
        <path d="M 72 198 Q 72 188 86 188 Q 100 188 100 198 Z" fill={fur} stroke={ink} strokeWidth={STROKE} strokeLinejoin="round" />
        <path d="M 140 198 Q 140 188 154 188 Q 168 188 168 198 Z" fill={fur} stroke={ink} strokeWidth={STROKE} strokeLinejoin="round" />
        {/* paw toes */}
        <g stroke={ink} strokeWidth="2" strokeLinecap="round">
          <line x1="80" y1="190" x2="80" y2="198" />
          <line x1="88" y1="188" x2="88" y2="198" />
          <line x1="96" y1="190" x2="96" y2="198" />
          <line x1="148" y1="190" x2="148" y2="198" />
          <line x1="156" y1="188" x2="156" y2="198" />
          <line x1="164" y1="190" x2="164" y2="198" />
        </g>
      </g>
    )
  } else if (variant === 'stretch') {
    // STRETCH — back arched, yawn. Side-ish view but face still forward.
    silhouette = (
      <g>
        {/* tail straight up (behind) */}
        <path d="M 200 198 Q 218 160 214 124" fill="none" stroke={fur} strokeWidth="20" strokeLinecap="round" />
        <path d="M 200 198 Q 218 160 214 124" fill="none" stroke={ink} strokeWidth={STROKE} strokeLinecap="round" />
        {/* body silhouette — arched */}
        <path
          d="
            M 70 22
            L 90 60
            Q 120 50 150 60
            L 170 22
            Q 178 16 178 36
            L 174 70
            Q 188 90 188 130
            Q 196 188 202 218
            Q 202 232 178 232
            Q 170 232 168 222
            L 168 210
            Q 158 198 138 200
            Q 100 200 84 210
            L 84 222
            Q 82 232 74 232
            Q 50 232 50 218
            Q 56 188 64 130
            Q 52 90 66 70
            L 62 36
            Q 62 16 70 22
            Z
          "
          fill={fur}
          stroke={ink}
          strokeWidth={STROKE}
          strokeLinejoin="round"
        />
      </g>
    )
    interior = (
      <path d="M 72 196 Q 120 184 176 196 Q 176 210 120 212 Q 72 210 72 196 Z" fill={bellyColor} />
    )
    face = <Face ink={ink} fur={fur} accent={accent} eye="closed" mouth="yawn" />
  } else if (variant === 'grump') {
    // GRUMP — square shoulders, squint, frown.
    silhouette = (
      <path
        d="
          M 70 22
          L 88 56
          Q 120 48 152 56
          L 170 22
          Q 178 16 178 36
          L 174 64
          Q 188 80 188 124
          Q 188 152 174 162
          L 184 222
          Q 184 232 168 232
          L 72 232
          Q 56 232 56 222
          L 66 162
          Q 52 152 52 124
          Q 52 80 66 64
          L 62 36
          Q 62 16 70 22
          Z
        "
        fill={fur}
        stroke={ink}
        strokeWidth={STROKE}
        strokeLinejoin="round"
      />
    )
    interior = (
      <path d="M 84 196 Q 120 220 156 196 Q 156 226 120 228 Q 84 226 84 196 Z" fill={bellyColor} />
    )
    face = <Face ink={ink} fur={fur} accent={accent} eye="squint" mouth="frown" />
  } else if (variant === 'walk') {
    // WALK — horizontal body, side-on. Head turned forward at viewer-left.
    silhouette = (
      <g>
        {/* tail back */}
        <path d="M 200 174 Q 232 160 232 130" fill="none" stroke={fur} strokeWidth="18" strokeLinecap="round" />
        <path d="M 200 174 Q 232 160 232 130" fill="none" stroke={ink} strokeWidth={STROKE} strokeLinecap="round" />
        {/* head + horizontal body as one outline */}
        <path
          d="
            M 14 110
            L 30 80
            Q 36 76 36 88
            L 36 110
            Q 44 100 64 100
            L 200 100
            Q 220 100 222 140
            L 222 184
            Q 222 200 200 200
            L 188 200
            L 188 218
            Q 188 226 178 226
            Q 168 226 168 218
            L 168 200
            L 72 200
            L 72 218
            Q 72 226 62 226
            Q 52 226 52 218
            L 52 200
            Q 36 200 30 184
            Q 18 180 14 156
            Q 8 130 14 110
            Z
          "
          fill={fur}
          stroke={ink}
          strokeWidth={STROKE}
          strokeLinejoin="round"
        />
      </g>
    )
    // For walk we recompose a sideways face — override default
    face = (
      <g transform="translate(-50, 18)">
        <Face ink={ink} fur={fur} accent={accent} eye="open" mouth="smirk" />
      </g>
    )
    interior = null
  } else if (variant === 'sip') {
    // SIP — chubby chibi sitting upright holding a mug.
    silhouette = (
      <path
        d="
          M 70 22
          L 88 58
          Q 120 44 152 58
          L 170 22
          Q 178 16 178 36
          L 172 62
          Q 198 88 198 138
          Q 198 180 170 188
          Q 188 222 146 228
          Q 120 234 94 228
          Q 52 222 70 188
          Q 42 180 42 138
          Q 42 88 68 62
          L 62 36
          Q 62 16 70 22
          Z
        "
        fill={fur}
        stroke={ink}
        strokeWidth={STROKE}
        strokeLinejoin="round"
      />
    )
    interior = (
      <g>
        {/* belly */}
        <path d="M 92 188 Q 120 220 148 188 Q 148 224 120 228 Q 92 224 92 188 Z" fill={bellyColor} />
        {/* paws holding mug — drawn over the lower head/upper body */}
        <ellipse cx="96" cy="172" rx="12" ry="10" fill={fur} stroke={ink} strokeWidth={STROKE} />
        <ellipse cx="144" cy="172" rx="12" ry="10" fill={fur} stroke={ink} strokeWidth={STROKE} />
        {/* mug */}
        <g transform="translate(100, 162)">
          <rect x="0" y="0" width="40" height="34" rx="4" fill={accent} stroke={ink} strokeWidth={STROKE} />
          <path d="M 40 8 Q 54 8 54 17 Q 54 26 40 26" fill="none" stroke={ink} strokeWidth={STROKE} />
          <g stroke={ink} strokeWidth="2.4" strokeLinecap="round" fill="none" opacity="0.8">
            <path d="M 12 -6 Q 16 -12 12 -18" />
            <path d="M 24 -8 Q 28 -14 24 -20" />
          </g>
        </g>
      </g>
    )
    face = <Face ink={ink} fur={fur} accent={accent} eye="open" mouth="sip" />
  } else {
    // fallback to sit
    silhouette = null
    interior = null
  }

  return (
    <svg
      viewBox={VB}
      width={size}
      height={size}
      style={{ transform: `rotate(${rotate}deg)`, overflow: 'visible', ...style }}
      className={className}
      aria-label={`Wanda the one-eyed cat — ${variant}`}
    >
      {halo}
      {silhouette}
      {interior}
      {/* inner-ear color sits on top of the silhouette */}
      {variant !== 'walk' && innerEars}
      {/* peek mode: small ears poking up over the head */}
      {variant === 'peek' && (
        <g>
          <path d="M 78 50 L 70 22 L 92 56 Z" fill={accent} stroke={ink} strokeWidth={STROKE_FINE} strokeLinejoin="round" />
          <path d="M 162 50 L 170 22 L 148 56 Z" fill={accent} stroke={ink} strokeWidth={STROKE_FINE} strokeLinejoin="round" />
        </g>
      )}
      {face}
    </svg>
  )
}

// ─── Legacy variant shim — keep old call sites working ───
const VARIANT_MAP: Record<string, CanonicalVariant> = {
  smug: 'sit',
  wink: 'sit',
  yowl: 'grump',
  sleep: 'loaf',
  scratch: 'stretch',
}

export interface WandaCatProps extends Omit<WandaProps, 'variant'> {
  variant?: WandaVariant
}

// Public cat — accepts canonical and legacy variant names.
export const WandaCat = ({ variant = 'sit', ...props }: WandaCatProps) => {
  const v = (VARIANT_MAP[variant] || variant) as CanonicalVariant
  return <Wanda variant={v} {...props} />
}

// ─── Single eye — used for cursor follower ───
export interface WandaEyeProps {
  size?: number
  pupilOffset?: { x: number; y: number }
  ink?: string
  fill?: string
}

export const WandaEye = ({
  size = 40,
  pupilOffset = { x: 0, y: 0 },
  ink = '#0E0E0E',
  fill = '#F7F4ED',
}: WandaEyeProps) => (
  <svg viewBox="0 0 60 60" width={size} height={size} style={{ overflow: 'visible' }}>
    <ellipse cx="30" cy="30" rx="22" ry="26" fill={fill} stroke={ink} strokeWidth="4" />
    <ellipse cx={30 + pupilOffset.x} cy={30 + pupilOffset.y} rx="9" ry="11" fill={ink} />
    <circle cx={32 + pupilOffset.x} cy={26 + pupilOffset.y} r="2.5" fill={fill} />
  </svg>
)

// ─── Mono silhouette — for stickers + marquee dots ───
// `knockout` controls the face-feature color so the stamp reads on any
// background. Pass an explicit color for non-default fills (e.g. cream
// stamps on dark bg need a dark knockout, not the cream default).
export interface WandaStampProps {
  size?: number
  color?: string
  knockout?: string
  style?: CSSProperties
  rotate?: number
}

export const WandaStamp = ({
  size = 120,
  color = '#0E0E0E',
  knockout = '#F7F4ED',
  style = {},
  rotate = 0,
}: WandaStampProps) => (
  <svg
    viewBox="0 0 240 240"
    width={size}
    height={size}
    style={{ transform: `rotate(${rotate}deg)`, overflow: 'visible', ...style }}
  >
    {/* Solid Wanda silhouette — chibi sit pose */}
    <path
      d="
        M 70 22
        L 88 58
        Q 120 44 152 58
        L 170 22
        Q 178 16 178 36
        L 172 62
        Q 198 88 198 138
        Q 198 180 170 188
        Q 188 222 146 228
        Q 120 234 94 228
        Q 52 222 70 188
        Q 42 180 42 138
        Q 42 88 68 62
        L 62 36
        Q 62 16 70 22
        Z
      "
      fill={color}
    />
    {/* Knockout face features — color picked by caller to contrast with `color`.
        Mirrors the cute Face component: round eye, soft X, :3 mouth. */}
    <circle cx="100" cy="112" r="11" fill={knockout} />
    <g stroke={knockout} strokeWidth="5.5" strokeLinecap="round">
      <line x1="134" y1="104" x2="154" y2="122" />
      <line x1="154" y1="104" x2="134" y2="122" />
    </g>
    <g fill="none" stroke={knockout} strokeWidth="3.5" strokeLinecap="round">
      <path d="M 120 142 Q 116 152 108 148" />
      <path d="M 120 142 Q 124 152 132 148" />
    </g>
  </svg>
)
