import type { ButtonHTMLAttributes } from "react"
import type { Intent } from "./intent"

type NativeButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "data-intent" | "aria-busy" | "aria-invalid"
>

type ForbiddenProps = {
  "data-intent"?: never
  "aria-busy"?: never
  "aria-invalid"?: never
}

export type ButtonProps = NativeButtonProps &
  ForbiddenProps & {
    intent?: Intent
    loading?: boolean
    invalid?: boolean
  }