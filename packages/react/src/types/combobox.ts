import type { HTMLAttributes } from "react"
import type { Intent } from "./intent"

type NativeProps = Omit<
  HTMLAttributes<HTMLElement>,
  "data-intent"
>

type ForbiddenProps = {
  "data-intent"?: never
}

export type ComboboxProps = NativeProps &
  ForbiddenProps & {
    intent?: Intent
    multiple?: boolean
  }