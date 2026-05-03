import type { HTMLAttributes } from "react"
import type { Intent } from "./intent"

type NativeAsideProps = Omit<
  HTMLAttributes<HTMLElement>,
  "data-intent"
>

type ForbiddenProps = {
  "data-intent"?: never
}

export type AlertProps = NativeAsideProps &
  ForbiddenProps & {
    intent?: Intent
  }