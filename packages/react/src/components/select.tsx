import type { SelectProps } from "../types/select"

export function Select({
  label,
  intent,
  invalid,
  disabled,
  
  ...rest
}: SelectProps) {
  const selectEl = (
    <select
      data-intent={intent}
      disabled={disabled}
      aria-invalid={invalid ? "true" : undefined}
      {...rest}
    />
  )

  if (!label) return selectEl

  return (
    <label>
      {label}
      {selectEl}
    </label>
  )
}