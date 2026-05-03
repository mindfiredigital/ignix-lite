import type { SkeletonProps } from "../types/skeleton"

export function Skeleton({
  shape = "text",
  lines,
  ...rest
}: SkeletonProps) {
  return (
    <span
      role="status"
      aria-busy="true"
      aria-label="loading"
      data-shape={shape}
      data-lines={lines}
      {...rest}
    />
  )
}