import type { HTMLAttributes } from "react"

export type CodeProps = HTMLAttributes<HTMLElement> & {
  lang?: string
}