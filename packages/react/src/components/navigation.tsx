import type { NavigationProps } from "../types/navigation"

export function Navigation({
  children,
  ...rest
}: NavigationProps) {
  return <nav {...rest}>{children}</nav>
}