import type { DividerProps } from "../types/divider"

export function Divider({
  orientation,
  ...rest
}: DividerProps) {
  return (
    <hr
      data-orientation={orientation === "vertical" ? "vertical" : undefined}
      {...rest}
    />
  )
}