import type { SelectHTMLAttributes } from "react";
import type { Intent } from "./intent";

type NativeSelectProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "data-intent" | "aria-invalid"
>

type ForbiddenProps = {
  "data-intent"?: never
  "aria-invalid"?: never
}

export type SelectProps = NativeSelectProps & ForbiddenProps & {
  label?: string
  intent?: Intent
  invalid?: boolean
}