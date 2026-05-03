import type { InputHTMLAttributes } from "react"

type NativeRadioProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
>

export type RadioProps = NativeRadioProps & {
  label?: string
}