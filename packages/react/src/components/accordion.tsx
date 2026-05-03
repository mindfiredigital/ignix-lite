import type { AccordionProps } from "../types/accordion"

export function Accordion({
  children,
  ...rest
}: AccordionProps) {
  return (
    <details {...rest}>
      {children}
    </details>
  )
}