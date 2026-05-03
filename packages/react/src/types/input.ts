import type { InputHTMLAttributes } from "react"
import type { Intent } from "./intent"

type NativeInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "aria-invalid" | "data-intent"
>
type ForbiddenProps = {
    "data-intent"?: never;
    "aria-invalid"?: never;
};
export type InputProps = NativeInputProps & ForbiddenProps & {
  label?: string
  intent?: Intent
  invalid?: boolean
}