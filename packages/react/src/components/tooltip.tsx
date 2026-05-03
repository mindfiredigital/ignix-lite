import type { TooltipProps } from "../types/tooltip"

export function Tooltip({
  content,
  intent,
  position,
  children,
  ...rest
}: TooltipProps) {
  return (
    <ix-tooltip
      content={content}
      data-intent={intent}
      data-position={position}
      {...rest}
    >
      {children}
    </ix-tooltip>
  )
}