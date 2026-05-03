import type { ToastOptions } from "./toast"

export interface IxToastElement extends HTMLElement {
  show: (options: ToastOptions) => void
}