import type { HTMLAttributes } from "react"

type NativeSpanProps = Omit<
  HTMLAttributes<HTMLSpanElement>,
  "aria-busy" | "data-shape" | "data-lines" | "role"
>

type ForbiddenProps = {
  "aria-busy"?: never
  "data-shape"?: never
  "data-lines"?: never
  role?: never
}

export type SkeletonProps = NativeSpanProps &
  ForbiddenProps & {
    shape?: "text" | "rect" | "circle"
    lines?: number
  }