import type { HTMLAttributes } from "react"
import type { Intent } from "./intent"

type NativeProps = Omit<
  HTMLAttributes<HTMLElement>,
  "data-intent" | "role"
>

type ForbiddenProps = {
  "data-intent"?: never
  role?: never
}

export type BadgeProps = NativeProps &
  ForbiddenProps & {
    intent?: Intent
    status?: boolean
  }