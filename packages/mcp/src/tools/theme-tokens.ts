import { resolveColor } from './theme-palette.js'

export interface ThemeTokens {
  primary: string
  primaryHover: string
  primaryContrast: string
  primaryBg: string

  danger: string
  dangerText: string
  dangerBg: string

  warning: string
  warningBg: string

  success: string
  successBg: string

  infoBg: string
  neutral: string
  divider: string

  surface: string
  surfaceRaised: string

  text: string
  textMuted: string
  border: string

  radius: string
  radiusLg: string
  badgeRadius: string

  skeletonBg: string
  skeletonShimmer: string

  gradientStart: string
  gradientEnd: string
  gradientBgEnd: string

  isDark: boolean
  resolvedPrimary: string
  resolvedContrast: string
}

export function resolveTokens(query: string): ThemeTokens {
  const { primary, contrast } = resolveColor(query)

  const isDark =
    query.includes('dark') ||
    query.includes('night') ||
    query.includes('midnight') ||
    query.includes('cyberpunk') ||
    query.includes('dim')

  const sharp =
    query.includes('sharp') ||
    query.includes('flat') ||
    query.includes('square')
  const round =
    query.includes('round') || query.includes('pill') || query.includes('soft')

  return {
    resolvedPrimary: primary,
    resolvedContrast: contrast,
    isDark,

    primary,
    primaryHover: isDark
      ? 'color-mix(in srgb, var(--ix-primary) 75%, white)'
      : 'color-mix(in srgb, var(--ix-primary) 85%, black)',
    primaryContrast: isDark
      ? 'color-mix(in srgb, var(--ix-primary) 40%, white)'
      : contrast,
    primaryBg: isDark
      ? 'color-mix(in srgb, var(--ix-primary) 20%, #0f172a)'
      : 'color-mix(in srgb, var(--ix-primary) 15%, white)',

    danger: '#ef4444',
    dangerText: isDark ? '#f87171' : '#ef4444',
    dangerBg: isDark ? '#3f1d1d' : '#fee2e2',

    warning: isDark ? '#fbbf24' : '#f59e0b',
    warningBg: isDark ? '#3f2e05' : '#fef3c7',

    success: '#22c55e',
    successBg: isDark ? '#052e16' : '#dcfce7',

    infoBg: isDark ? '#1e293b' : '#f3f4f6',
    neutral: isDark ? '#9ca3af' : '#6b7280',
    divider: isDark ? '#475569' : '#9ca3af',

    surface: isDark ? '#0f172a' : '#f9fafb',
    surfaceRaised: isDark ? '#1e293b' : '#ffffff',

    text: isDark ? '#f9fafb' : '#111827',
    textMuted: isDark ? '#94a3b8' : '#6b7280',
    border: isDark ? '#334155' : '#e5e7eb',

    radius: sharp ? '0px' : round ? '0.75rem' : '0.375rem',
    radiusLg: sharp ? '0px' : round ? '1rem' : '0.5rem',
    badgeRadius: '999px',

    skeletonBg: isDark ? '#1e293b' : '#e5e7eb',
    skeletonShimmer: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.6)',

    gradientStart: primary,
    gradientEnd: '#fffbd5',
    gradientBgEnd: isDark ? '#aba67a' : '#d7d4bc'
  }
}

export function buildCss(t: ThemeTokens): string {
  return `:root {
  --ix-primary:          ${t.primary};
  --ix-primary-hover:    ${t.primaryHover};
  --ix-primary-contrast: ${t.primaryContrast};

  --ix-danger:      ${t.danger};
  --ix-danger-text: ${t.dangerText};

  --ix-warning: ${t.warning};
  --ix-success: ${t.success};
  --ix-neutral: ${t.neutral};
  --ix-ghost:   transparent;

  --ix-primary-bg: ${t.primaryBg};
  --ix-danger-bg:  ${t.dangerBg};
  --ix-warning-bg: ${t.warningBg};
  --ix-success-bg: ${t.successBg};
  --ix-info-bg:    ${t.infoBg};

  --ix-on-danger:  #ffffff;
  --ix-on-warning: #000000;
  --ix-on-success: #ffffff;
  --ix-on-primary: ${t.resolvedContrast};

  --ix-divider: ${t.divider};

  --ix-surface:        ${t.surface};
  --ix-surface-raised: ${t.surfaceRaised};

  --ix-text:       ${t.text};
  --ix-text-muted: ${t.textMuted};

  --ix-border: ${t.border};
  --ix-focus:  2px solid var(--ix-primary);

  --ix-font: 'Segoe UI Variable', 'Segoe UI', 'Roboto', 'Noto Sans', system-ui, sans-serif;
  --ix-font-mono: 'JetBrains Mono', 'SFMono-Regular', Consolas, monospace;

  --ix-size-xs: 0.75rem;
  --ix-size-sm: 0.875rem;
  --ix-size-md: 1rem;
  --ix-size-lg: 1.125rem;
  --ix-size-xl: 1.25rem;

  --ix-line-height: 1.5;

  --ix-space-sm: 0.5rem;
  --ix-space-md: 1rem;
  --ix-space-lg: 1.5rem;

  --ix-radius:       ${t.radius};
  --ix-radius-lg:    ${t.radiusLg};
  --ix-badge-radius: ${t.badgeRadius};

  --ix-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  --ix-gradient:    linear-gradient(to right, ${t.gradientStart}, ${t.gradientEnd});
  --ix-gradient-bg: linear-gradient(to right, ${t.gradientStart}, ${t.gradientBgEnd});

  --ix-skeleton-bg:      ${t.skeletonBg};
  --ix-skeleton-shimmer: ${t.skeletonShimmer};
}`
}
