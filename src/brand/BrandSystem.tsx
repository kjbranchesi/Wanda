// Brand System — composes all artboards into the design canvas, with a topbar
// back to the landing page.
import { DesignCanvas, DCSection, DCArtboard } from './DesignCanvas'
import {
  BSLogo,
  BSMarks,
  BSPalette,
  BSType,
  BSVoice,
  BSPackaging,
  BSStationery,
  BSPoster,
  BSSignage,
  BSSocial,
} from './cards'

export default function BrandSystem() {
  return (
    <>
      <div className="bs-topbar">
        <span>ONE EYED WANDA · BRAND SYSTEM</span>
        <a href="index.html">← Landing</a>
      </div>

      <DesignCanvas>
        <DCSection id="identity" title="Identity" subtitle="Logo, marks, and the saint of Mondays">
          <DCArtboard id="logo-primary" label="Primary lockup" width={900} height={620}>
            <BSLogo />
          </DCArtboard>
          <DCArtboard id="marks" label="Geometric mood set" width={760} height={620}>
            <BSMarks />
          </DCArtboard>
        </DCSection>

        <DCSection id="palette" title="Palette" subtitle="Core voice + secondary directions">
          <DCArtboard id="palette-core" label="Color system" width={1000} height={720}>
            <BSPalette />
          </DCArtboard>
        </DCSection>

        <DCSection id="type" title="Typography" subtitle="Display, italic, body, mono">
          <DCArtboard id="type-system" label="Type system" width={1100} height={900}>
            <BSType />
          </DCArtboard>
          <DCArtboard id="voice" label="Voice & copy" width={840} height={620}>
            <BSVoice />
          </DCArtboard>
        </DCSection>

        <DCSection id="packaging" title="Packaging" subtitle="Bag/can system across roast levels">
          <DCArtboard id="cans" label="Three-roast lineup" width={900} height={620}>
            <BSPackaging />
          </DCArtboard>
        </DCSection>

        <DCSection id="applied" title="Applied" subtitle="Stationery, signage, posters, social">
          <DCArtboard id="stationery" label="Stationery + stickers" width={900} height={420}>
            <BSStationery />
          </DCArtboard>
          <DCArtboard id="poster" label="In-cafe poster" width={520} height={760}>
            <BSPoster />
          </DCArtboard>
          <DCArtboard id="signage" label="Awning + signage" width={900} height={540}>
            <BSSignage />
          </DCArtboard>
          <DCArtboard id="social" label="Social templates" width={900} height={500}>
            <BSSocial />
          </DCArtboard>
        </DCSection>
      </DesignCanvas>
    </>
  )
}
