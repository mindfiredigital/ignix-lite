import type { DropdownProps } from "../types/dropdown"

export function Dropdown({
  intent,
  children,
  ...rest
}: DropdownProps) {
  return (
    <ix-dropdown data-intent={intent} {...rest}>
      {children}
    </ix-dropdown>
  )
}