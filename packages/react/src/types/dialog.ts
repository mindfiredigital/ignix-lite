import type { DialogHTMLAttributes } from "react"
import type { Intent } from "./intent"

type NativeDialogProps = Omit<
  DialogHTMLAttributes<HTMLDialogElement>,
  "data-intent"
>

type ForbiddenProps = {
  "data-intent"?: never
}

export type DialogProps = NativeDialogProps & ForbiddenProps & {
  id: string
  intent?: Intent
}