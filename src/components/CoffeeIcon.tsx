// Coffee icon family — drawn in the same flat-illustration style as the
// refined Wanda (Keykney-leaning): soft geometric shapes, no harsh outlines,
// a single accent color, gentle character.
//
// All icons share a 100×100 viewBox and accept the same color props so they
// drop into mood-board grids, badges, marquees, etc. without setup.
import type { CSSProperties, ReactElement } from 'react'

interface IconColors {
  ink: string
  accent: string
  paper: string
}

const COFFEE_ICONS: Record<string, (c: IconColors) => ReactElement> = {
  // ───────────── Coffee bean — the canonical mark ─────────────
  bean: ({ ink, accent, paper }) => (
    <g>
      <ellipse cx="50" cy="50" rx="26" ry="34" transform="rotate(-22 50 50)" fill={ink} />
      <path
        d="M 38 30 Q 50 50 40 72"
        fill="none"
        stroke={paper}
        strokeWidth="3"
        strokeLinecap="round"
        transform="rotate(-22 50 50)"
      />
      <circle cx="36" cy="38" r="2" fill={accent} opacity="0.9" />
    </g>
  ),

  // ───────────── Take-away cup ─────────────
  cup: ({ ink, accent, paper }) => (
    <g>
      {/* cup body */}
      <path d="M 28 36 L 36 88 Q 38 92 50 92 Q 62 92 64 88 L 72 36 Z" fill={accent} />
      {/* lid */}
      <rect x="22" y="28" width="56" height="10" rx="3" fill={ink} />
      <rect x="44" y="20" width="12" height="10" rx="2" fill={ink} />
      {/* sleeve */}
      <path d="M 32 56 L 68 56 L 66 70 L 34 70 Z" fill={paper} />
      <path d="M 32 56 L 68 56 L 66 70 L 34 70 Z" fill="none" stroke={ink} strokeWidth="1.5" />
      {/* steam */}
      <g stroke={ink} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.65">
        <path d="M 40 18 Q 44 12 40 6" />
        <path d="M 58 18 Q 54 12 58 6" />
      </g>
    </g>
  ),

  // ───────────── Mug + saucer (sit-down) ─────────────
  mug: ({ ink, accent, paper }) => (
    <g>
      {/* steam */}
      <g stroke={ink} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.65">
        <path d="M 36 16 Q 40 10 36 4" />
        <path d="M 50 12 Q 54 6 50 0" />
        <path d="M 64 16 Q 60 10 64 4" />
      </g>
      {/* saucer */}
      <ellipse cx="50" cy="86" rx="36" ry="6" fill={paper} stroke={ink} strokeWidth="2" />
      {/* mug */}
      <path d="M 28 36 Q 28 30 34 30 L 64 30 Q 70 30 70 36 L 68 76 Q 66 82 50 82 Q 34 82 32 76 Z" fill={accent} stroke={ink} strokeWidth="2" />
      {/* coffee inside */}
      <ellipse cx="49" cy="35" rx="18" ry="3.5" fill={ink} />
      {/* handle */}
      <path d="M 70 44 Q 84 46 84 56 Q 84 66 70 66" fill="none" stroke={ink} strokeWidth="3" strokeLinecap="round" />
    </g>
  ),

  // ───────────── Filter / dripper (V60-ish) ─────────────
  dripper: ({ ink, accent, paper }) => (
    <g>
      {/* carafe */}
      <path d="M 30 64 L 70 64 L 64 90 Q 62 94 50 94 Q 38 94 36 90 Z" fill={paper} stroke={ink} strokeWidth="2" />
      <ellipse cx="50" cy="64" rx="20" ry="3" fill={ink} opacity="0.6" />
      {/* cone */}
      <path d="M 22 24 L 78 24 L 56 62 L 44 62 Z" fill={accent} stroke={ink} strokeWidth="2" strokeLinejoin="round" />
      {/* paper filter peeking */}
      <path d="M 26 24 L 74 24 L 56 56 L 44 56 Z" fill={paper} />
      {/* drip */}
      <ellipse cx="50" cy="70" rx="2" ry="3" fill={ink} />
    </g>
  ),

  // ───────────── Kettle (gooseneck) ─────────────
  kettle: ({ ink, accent, paper }) => (
    <g>
      {/* body */}
      <path d="M 24 50 Q 24 38 36 36 L 64 36 Q 76 38 76 50 L 72 80 Q 70 86 50 86 Q 30 86 28 80 Z" fill={accent} stroke={ink} strokeWidth="2" />
      {/* lid */}
      <rect x="40" y="28" width="20" height="8" rx="2" fill={ink} />
      <circle cx="50" cy="24" r="3" fill={ink} />
      {/* spout — gooseneck */}
      <path d="M 24 50 Q 6 46 8 28 Q 8 20 18 18" fill="none" stroke={ink} strokeWidth="4.5" strokeLinecap="round" />
      {/* handle */}
      <path d="M 76 50 Q 90 50 88 70" fill="none" stroke={ink} strokeWidth="3.5" strokeLinecap="round" />
      {/* highlight */}
      <ellipse cx="38" cy="56" rx="4" ry="14" fill={paper} opacity="0.4" />
    </g>
  ),

  // ───────────── Grinder (manual) ─────────────
  grinder: ({ ink, accent, paper }) => (
    <g>
      {/* crank */}
      <path d="M 50 8 L 50 22" stroke={ink} strokeWidth="3" strokeLinecap="round" />
      <path d="M 50 22 Q 64 22 64 16" fill="none" stroke={ink} strokeWidth="3" strokeLinecap="round" />
      <circle cx="64" cy="14" r="4" fill={ink} />
      {/* hopper top */}
      <rect x="36" y="22" width="28" height="14" rx="2" fill={paper} stroke={ink} strokeWidth="2" />
      {/* body */}
      <rect x="26" y="36" width="48" height="42" rx="4" fill={accent} stroke={ink} strokeWidth="2" />
      {/* drawer */}
      <rect x="30" y="62" width="40" height="14" rx="2" fill={paper} stroke={ink} strokeWidth="2" />
      <circle cx="50" cy="69" r="2.5" fill={ink} />
      {/* legs */}
      <rect x="28" y="78" width="6" height="6" fill={ink} />
      <rect x="66" y="78" width="6" height="6" fill={ink} />
    </g>
  ),

  // ───────────── Portafilter (espresso) ─────────────
  portafilter: ({ ink, accent, paper }) => (
    <g>
      {/* handle */}
      <rect x="2" y="44" width="32" height="12" rx="6" fill={ink} />
      <rect x="6" y="46" width="20" height="2" fill={paper} opacity="0.5" />
      {/* collar */}
      <rect x="32" y="40" width="10" height="20" rx="2" fill={paper} stroke={ink} strokeWidth="2" />
      {/* basket */}
      <path d="M 42 32 L 84 32 L 80 64 L 46 64 Z" fill={accent} stroke={ink} strokeWidth="2" strokeLinejoin="round" />
      {/* spout */}
      <path d="M 56 64 L 56 78 L 60 78 L 60 64 Z M 66 64 L 66 78 L 70 78 L 70 64 Z" fill={ink} />
      {/* drips */}
      <ellipse cx="58" cy="86" rx="1.5" ry="2.5" fill={ink} />
      <ellipse cx="68" cy="86" rx="1.5" ry="2.5" fill={ink} />
    </g>
  ),

  // ───────────── Roaster drum ─────────────
  roaster: ({ ink, accent, paper }) => (
    <g>
      {/* drum */}
      <ellipse cx="50" cy="50" rx="34" ry="22" fill={accent} stroke={ink} strokeWidth="2" />
      {/* door circle */}
      <circle cx="50" cy="50" r="14" fill={paper} stroke={ink} strokeWidth="2" />
      <circle cx="50" cy="50" r="2" fill={ink} />
      {/* legs */}
      <rect x="26" y="68" width="6" height="14" fill={ink} />
      <rect x="68" y="68" width="6" height="14" fill={ink} />
      {/* chimney */}
      <rect x="46" y="14" width="8" height="16" fill={ink} />
      {/* smoke */}
      <g fill={ink} opacity="0.35">
        <circle cx="50" cy="10" r="3.5" />
        <circle cx="56" cy="6" r="2.5" />
      </g>
      {/* highlight band */}
      <ellipse cx="50" cy="38" rx="20" ry="3" fill={paper} opacity="0.5" />
    </g>
  ),

  // ───────────── Cherry (coffee fruit) ─────────────
  cherry: ({ ink, accent, paper }) => (
    <g>
      {/* leaf */}
      <path d="M 50 14 Q 70 12 76 28 Q 60 32 50 24 Z" fill={accent} stroke={ink} strokeWidth="2" />
      <path d="M 50 14 Q 60 22 56 30" fill="none" stroke={ink} strokeWidth="1.5" />
      {/* stem */}
      <path d="M 50 18 L 50 36" stroke={ink} strokeWidth="3" strokeLinecap="round" />
      {/* cherry */}
      <circle cx="50" cy="60" r="22" fill={accent} stroke={ink} strokeWidth="2" />
      <ellipse cx="42" cy="52" rx="4" ry="6" fill={paper} opacity="0.4" />
    </g>
  ),

  // ───────────── Beans pile (small group) ─────────────
  beans: ({ ink, paper }) => (
    <g>
      {[
        { x: 32, y: 56, r: -24 },
        { x: 56, y: 50, r: 8 },
        { x: 44, y: 70, r: 42 },
        { x: 68, y: 70, r: -8 },
      ].map((b, i) => (
        <g key={i} transform={`translate(${b.x}, ${b.y}) rotate(${b.r})`}>
          <ellipse cx="0" cy="0" rx="11" ry="15" fill={ink} />
          <path d="M -4 -10 Q 0 0 -2 10" fill="none" stroke={paper} strokeWidth="1.5" strokeLinecap="round" />
        </g>
      ))}
    </g>
  ),

  // ───────────── Sun / morning halo ─────────────
  sun: ({ ink, accent }) => (
    <g>
      <circle cx="50" cy="50" r="20" fill={accent} stroke={ink} strokeWidth="2" />
      <g stroke={ink} strokeWidth="3" strokeLinecap="round">
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * Math.PI * 2) / 8
          const r1 = 26
          const r2 = 36
          return (
            <line
              key={i}
              x1={50 + Math.cos(a) * r1}
              y1={50 + Math.sin(a) * r1}
              x2={50 + Math.cos(a) * r2}
              y2={50 + Math.sin(a) * r2}
            />
          )
        })}
      </g>
    </g>
  ),

  // ───────────── Star — sparkle ─────────────
  spark: ({ ink, accent }) => (
    <g fill={accent} stroke={ink} strokeWidth="2" strokeLinejoin="round">
      <path d="M 50 8 L 56 42 L 92 50 L 56 58 L 50 92 L 44 58 L 8 50 L 44 42 Z" />
    </g>
  ),
}

export interface CoffeeIconProps {
  name: string
  size?: number
  ink?: string
  accent?: string
  paper?: string
  rotate?: number
  style?: CSSProperties
  className?: string
}

// Public component — pick by name.
export const CoffeeIcon = ({
  name,
  size = 96,
  ink = '#0E0E0E',
  accent = '#FF4D2E',
  paper = '#F7F4ED',
  rotate = 0,
  style = {},
  className = '',
}: CoffeeIconProps) => {
  const draw = COFFEE_ICONS[name]
  if (!draw) return null
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      style={{ transform: `rotate(${rotate}deg)`, overflow: 'visible', ...style }}
      className={className}
      aria-label={`coffee icon: ${name}`}
    >
      {draw({ ink, accent, paper })}
    </svg>
  )
}

// Convenience list for grids / pickers
export const COFFEE_ICON_NAMES = Object.keys(COFFEE_ICONS)
