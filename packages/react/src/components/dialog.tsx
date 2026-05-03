import type { DialogProps } from "../types/dialog"

export function Dialog({
  id,
  intent,
  children,
  ...rest
}: DialogProps) {
  return (
    <dialog
      id={id}
      data-intent={intent}
      {...rest}
    >
      {children}
    </dialog>
  )
}