import type { Intent } from "./intent"

export type ToastVariant = "fade" | "slide" | "pop"

export type ToastOptions = {
  title?: string
  message?: string
  intent?: Intent
  duration?: number
  variant?: ToastVariant
}

export type ToastProps = {
  position?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "bottom-center"
}