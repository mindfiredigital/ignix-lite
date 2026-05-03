import type { AvatarProps } from "../types/avatar"

export function Avatar(props: AvatarProps) {
  if ("fallback" in props && props.fallback) {
    const { size = "md", children, ...rest } = props

    return (
      <span data-size={size} {...rest}>
        {children}
      </span>
    )
  }

  const { size = "md", ...rest } = props

  return <img data-size={size} {...rest} />
}