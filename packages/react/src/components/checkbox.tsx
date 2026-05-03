import type { CheckboxProps } from "../types/checkbox"

export function Checkbox({
  label,
  ...rest
}: CheckboxProps) {
  const checkboxEl = (
    <input type="checkbox" {...rest} />
  )

  if (!label) return checkboxEl

  return (
    <label>
      {checkboxEl}
      {label}
    </label>
  )
}