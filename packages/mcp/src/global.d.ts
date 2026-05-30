declare module 'emmet' {
  export default function expand(
    abbr: string,
    config?: Record<string, unknown>
  ): string
  export function markup(abbr: string, config: Record<string, unknown>): string
  export function stylesheet(
    abbr: string,
    config: Record<string, unknown>
  ): string
  export function resolveConfig(
    config: Record<string, unknown>
  ): Record<string, unknown>
  export const stringifyMarkup: (node: unknown) => string
}
