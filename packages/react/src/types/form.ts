import type { FormHTMLAttributes } from "react"

type NativeFormProps = Omit<
  FormHTMLAttributes<HTMLFormElement>,
  "aria-busy" | "data-loading"
>

type ForbiddenProps = {
  "aria-busy"?: never
  "data-loading"?: never
}

export type FormProps = NativeFormProps &
  ForbiddenProps & {
    loading?: boolean
  }