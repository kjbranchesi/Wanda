// App root for One Eyed Wanda.
// Wires Tweaks to CSS variables + body classes, composes all sections, mounts
// the cursor-follow eye, and exposes the live brand explorer.
import { useEffect } from 'react'
import { useTweaks, type Tweaks } from './tweaks/useTweaks'
import {
  TweaksPanel,
  TweakSection,
  TweakColor,
  TweakRadio,
  TweakToggle,
  TweakSlider,
  TweakText,
} from './tweaks/TweaksPanel'
import { CursorEye } from './components/CursorEye'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { Story } from './components/Story'
import { MoodBoard } from './components/MoodBoard'
import { Menu } from './components/Menu'
import { Cult } from './components/Cult'
import { StickerPack } from './components/StickerPack'
import { Wholesale } from './components/Wholesale'
import { Feed } from './components/Feed'
import { Footer } from './components/Footer'

// palette is stored as [flame, acid, ink, cream] — the bold colors lead so the
// TweakColor swatch renders them as the hero.
const TWEAK_DEFAULTS: Tweaks = {
  palette: ['#FF4D2E', '#B8FF3D', '#0E0E0E', '#F7F4ED'],
  vibe: 'loud',
  showCursorEye: true,
  marqueeSpeed: 45,
  tagline: 'She lost an eye. We found a roast.',
}

// Curated palette options — bold first, neutrals after.
const PALETTE_OPTIONS: string[][] = [
  ['#FF4D2E', '#B8FF3D', '#0E0E0E', '#F7F4ED'], // Mono Pop (default)
  ['#E63946', '#2A9D8F', '#1D3557', '#F4E9D8'], // Italian Red
  ['#FF6B35', '#FFD23F', '#181100', '#FFF8EE'], // Amber Haze
  ['#D4581E', '#7A8B5C', '#3A2618', '#EAE6DD'], // Espresso & Olive
  ['#E8A33D', '#6B4F8C', '#2B2B2B', '#F2EDE4'], // Wisteria
  ['#FF3366', '#06D6A0', '#0F0E17', '#FFFFFE'], // Punk Mint
  ['#FFB7C5', '#3A86FF', '#1B1B1F', '#FBF3E4'], // Bubble Tape
  ['#F02D3A', '#FAD201', '#0A0A0A', '#FFF7E6'], // Hot Sign
  ['#0EA5E9', '#F5A623', '#11151C', '#F4F6F8'], // Cyan Diner
  ['#7B2D26', '#C9CBA3', '#1A0F08', '#F3EAD3'], // Vintage Brick
  ['#A06CD5', '#FFE74C', '#0A0F1F', '#F0EAF7'], // Grape Soda
  ['#16A34A', '#FB923C', '#0A0F0A', '#F0F7F2'], // Bodega Lime
]

export default function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS)

  // Apply palette — value is [flame, acid, ink, cream]
  useEffect(() => {
    const [flame, acid, ink, cream] = t.palette
    const root = document.documentElement
    root.style.setProperty('--ink', ink)
    root.style.setProperty('--cream', cream)
    root.style.setProperty('--flame', flame)
    root.style.setProperty('--acid', acid)
  }, [t.palette])

  // Apply vibe
  useEffect(() => {
    document.body.classList.toggle('vibe-zine', t.vibe === 'zine')
  }, [t.vibe])

  // Apply cursor toggle
  useEffect(() => {
    document.body.style.cursor = t.showCursorEye ? 'none' : 'auto'
  }, [t.showCursorEye])

  const marqueeWords = [
    'ONE EYED WANDA',
    String(t.tagline || '').toUpperCase(),
    'ROASTED IN WILBRAHAM, MA',
    'EST. 2026',
    'SHE SEES YOU',
  ]

  return (
    <div className="oew-app">
      {t.showCursorEye && <CursorEye />}

      <Nav />
      <Hero tagline={t.tagline} />

      <Marquee items={marqueeWords} speed={t.marqueeSpeed} />

      <Story />

      <MoodBoard />

      <Marquee
        items={[
          'ROAST DAY · TUESDAY',
          'SUBSCRIBE · THE CULT',
          'DECAF DROP · FRIDAY',
          'WILBRAHAM · MASS.',
        ]}
        speed={t.marqueeSpeed * 0.8}
        accent
      />

      <Menu />
      <Cult />
      <StickerPack />
      <Wholesale />
      <Feed />
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Palette" />
        <TweakColor
          label="Color"
          value={t.palette}
          options={PALETTE_OPTIONS}
          onChange={(v) => setTweak('palette', v)}
        />

        <TweakSection label="Vibe" />
        <TweakRadio
          label="Direction"
          value={t.vibe}
          options={[
            { value: 'loud', label: 'Loud' },
            { value: 'zine', label: 'Zine' },
          ]}
          onChange={(v) => setTweak('vibe', v as Tweaks['vibe'])}
        />

        <TweakSection label="Motion" />
        <TweakToggle
          label="Cursor follows Wanda"
          value={t.showCursorEye}
          onChange={(v) => setTweak('showCursorEye', v)}
        />
        <TweakSlider
          label="Marquee speed"
          value={t.marqueeSpeed}
          min={15}
          max={120}
          step={5}
          unit="s"
          onChange={(v) => setTweak('marqueeSpeed', v)}
        />

        <TweakSection label="Copy" />
        <TweakText label="Hero tagline" value={t.tagline} onChange={(v) => setTweak('tagline', v)} />
      </TweaksPanel>
    </div>
  )
}
