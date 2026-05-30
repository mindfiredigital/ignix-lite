export interface ColorEntry {
  primary: string
  contrast: string
}

export const PALETTE: Record<string, ColorEntry> = {
  red: { primary: '#ef4444', contrast: '#ffffff' },
  orange: { primary: '#f97316', contrast: '#ffffff' },
  amber: { primary: '#f59e0b', contrast: '#111827' },
  yellow: { primary: '#eab308', contrast: '#111827' },
  lime: { primary: '#84cc16', contrast: '#111827' },
  green: { primary: '#22c55e', contrast: '#ffffff' },
  emerald: { primary: '#10b981', contrast: '#ffffff' },
  teal: { primary: '#14b8a6', contrast: '#ffffff' },
  cyan: { primary: '#06b6d4', contrast: '#111827' },
  sky: { primary: '#0ea5e9', contrast: '#111827' },
  blue: { primary: '#3b82f6', contrast: '#ffffff' },
  indigo: { primary: '#6366f1', contrast: '#ffffff' },
  violet: { primary: '#8b5cf6', contrast: '#ffffff' },
  purple: { primary: '#a855f7', contrast: '#ffffff' },
  fuchsia: { primary: '#d946ef', contrast: '#ffffff' },
  pink: { primary: '#ec4899', contrast: '#ffffff' },
  rose: { primary: '#f43f5e', contrast: '#ffffff' },
  cyberpunk: { primary: '#ec4899', contrast: '#ffffff' },
  neon: { primary: '#d946ef', contrast: '#ffffff' },
  eco: { primary: '#10b981', contrast: '#ffffff' },
  forest: { primary: '#0f766e', contrast: '#ffffff' },
  coffee: { primary: '#78350f', contrast: '#ffffff' },
  ocean: { primary: '#0284c7', contrast: '#ffffff' },
  sunset: { primary: '#f97316', contrast: '#ffffff' },
  midnight: { primary: '#3730a3', contrast: '#ffffff' },
  lavender: { primary: '#8b5cf6', contrast: '#ffffff' },
  coral: { primary: '#f43f5e', contrast: '#ffffff' },
  slate: { primary: '#64748b', contrast: '#ffffff' },
  gold: { primary: '#d97706', contrast: '#111827' },
  silver: { primary: '#94a3b8', contrast: '#111827' }
}

export function expandHex(hex: string): string {
  const h = hex.replace('#', '')
  return h.length === 3 ? '#' + h[0] + h[0] + h[1] + h[1] + h[2] + h[2] : hex
}

export function contrastFor(hex6: string): string {
  const h = hex6.replace('#', '')
  const r = parseInt(h.substring(0, 2), 16)
  const g = parseInt(h.substring(2, 4), 16)
  const b = parseInt(h.substring(4, 6), 16)
  return (r * 299 + g * 587 + b * 114) / 1000 > 165 ? '#111827' : '#ffffff'
}

export function resolveColor(query: string): ColorEntry {
  const hexMatch = query.match(/#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/)
  if (hexMatch) {
    const primary = expandHex(hexMatch[0])
    return { primary, contrast: contrastFor(primary) }
  }

  const sorted = Object.keys(PALETTE).sort((a, b) => b.length - a.length)
  for (const name of sorted) {
    if (query.includes(name)) return PALETTE[name]
  }

  return { primary: '#6366f1', contrast: '#ffffff' }
}
