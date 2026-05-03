import type { MeterProps } from "../types/meter"

export function Meter({
  ...rest
}: MeterProps) {
  return <meter {...rest} />
}