import type { HTMLAttributes } from "react"

type NativeProps = Omit<
  HTMLAttributes<HTMLElement>,
  "data-variant"
>

type ForbiddenProps = {
  "data-variant"?: never
}

export type TabsProps = NativeProps &
  ForbiddenProps & {
    variant?: "underline" | "pill" | "gradient"
  }