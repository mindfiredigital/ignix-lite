import type { InputProps } from "../types/input"

export function Input({
  label,
  intent,
  invalid,
  disabled,
  ...rest
}: InputProps) {
  const inputEl = (
    <input
      data-intent={intent}
      disabled={disabled}
      aria-invalid={invalid ? "true" : undefined}
      {...rest}
    />
  )

  if (!label) return inputEl

  
  return (
    <label>
      {label}
      {inputEl}
    </label>
  )
}