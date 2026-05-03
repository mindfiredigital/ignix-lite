import type { RadioProps } from "../types/radio"

export function Radio({
  label,
  ...rest
}: RadioProps) {
  const radioEl = (
    <input type="radio" {...rest} />
  )

  if (!label) return radioEl

  return (
    <label>
      {radioEl}
      {label}
    </label>
  )
}