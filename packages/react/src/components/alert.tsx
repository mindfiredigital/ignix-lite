import type { AlertProps } from "../types/alert"

export function Alert({
  intent = "info",
  children,
  ...rest
}: AlertProps) {
  return (
    <aside data-intent={intent} {...rest}>
      {children}
    </aside>
  )
}