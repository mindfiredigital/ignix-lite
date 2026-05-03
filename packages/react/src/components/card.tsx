import type { CardProps } from "../types/card"

export function Card({
  children,
  ...rest
}: CardProps) {
  return (
    <article {...rest}>
      {children}
    </article>
  )
}