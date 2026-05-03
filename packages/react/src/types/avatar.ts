import type { ImgHTMLAttributes, HTMLAttributes } from "react"

export type AvatarSize = "sm" | "md" | "lg"

type BaseProps = {
  size?: AvatarSize
}

export type AvatarImageProps = ImgHTMLAttributes<HTMLImageElement> &
  BaseProps & {
    fallback?: false
  }

export type AvatarFallbackProps = HTMLAttributes<HTMLSpanElement> &
  BaseProps & {
    fallback: true
  }

export type AvatarProps = AvatarImageProps | AvatarFallbackProps