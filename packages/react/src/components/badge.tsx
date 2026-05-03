import type { BadgeProps } from "../types/badge"

export function Badge({
  intent = "neutral",
  status,
  children,
  ...rest
}: BadgeProps) {
  if (status) {
    return (
      <span
        role="status"
        data-intent={intent}
        {...rest}
      >
        {children}
      </span>
    )
  }

  return (
    <mark data-intent={intent} {...rest}>
      {children}
    </mark>
  )
}