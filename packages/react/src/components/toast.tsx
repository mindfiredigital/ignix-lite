import { forwardRef, useImperativeHandle, useRef } from "react"
import type { ToastOptions, ToastProps } from "../types/toast"
import type { IxToastElement } from "../types/toast-element"

export type ToastRef = {
  show: (options: ToastOptions) => void
}

export const Toast = forwardRef<ToastRef, ToastProps>(
  ({ position }, ref) => {
    const elRef = useRef<IxToastElement | null>(null)

    useImperativeHandle(ref, () => ({
      show(options: ToastOptions) {
        elRef.current?.show(options)
      }
    }))

    return (
      <ix-toast
        ref={elRef}
        data-position={position}
      />
    )
  }
)