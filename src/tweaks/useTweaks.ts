// useTweaks — single source of truth for the live brand-explorer values.
// (The prototype also synced these to the design host over postMessage; in
// production there's no host, so this is plain local state.)
import { useCallback, useState } from 'react'

export interface Tweaks {
  /** [flame, acid, ink, cream] — bold colors first so the swatch reads right. */
  palette: string[]
  vibe: 'loud' | 'zine'
  showCursorEye: boolean
  marqueeSpeed: number
  tagline: string
}

export function useTweaks(defaults: Tweaks) {
  const [values, setValues] = useState<Tweaks>(defaults)
  const setTweak = useCallback(<K extends keyof Tweaks>(key: K, val: Tweaks[K]) => {
    setValues((prev) => ({ ...prev, [key]: val }))
  }, [])
  return [values, setTweak] as const
}
