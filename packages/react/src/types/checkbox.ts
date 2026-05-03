import type { InputHTMLAttributes } from "react"

type NativeCheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
>

export type CheckboxProps = NativeCheckboxProps & {
  label?: string
}