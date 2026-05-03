import type { ProgressProps } from "../types/progress"

export function Progress({
  ...rest
}: ProgressProps) {
  return <progress {...rest} />
}