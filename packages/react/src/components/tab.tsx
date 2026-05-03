import type { TabsProps } from "../types/tab"

export function Tabs({
  variant,
  children,
  ...rest
}: TabsProps) {
  return (
    <ix-tabs
      data-variant={variant}
      {...rest}
    >
      {children}
    </ix-tabs>
  )
}