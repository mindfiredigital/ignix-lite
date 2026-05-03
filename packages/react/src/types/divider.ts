import type { HTMLAttributes } from "react"

type NativeHrProps = Omit<
  HTMLAttributes<HTMLHRElement>,
  "data-orientation"
>

type ForbiddenProps = {
  "data-orientation"?: never
}

export type DividerProps = NativeHrProps &
  ForbiddenProps & {
    orientation?: "horizontal" | "vertical"
  }