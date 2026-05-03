import type { HTMLAttributes, ReactNode } from "react"
import type { Intent } from "./intent"

export type TooltipProps = HTMLAttributes<HTMLElement> & {
  content: string
  intent?: Extract<Intent, "success" | "danger" | "warning">
  position?: "top" | "bottom" | "left" | "right"
  children: ReactNode
}