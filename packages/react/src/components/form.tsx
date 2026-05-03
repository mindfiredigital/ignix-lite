import type { FormProps } from "../types/form"

export function Form({
  loading,
  children,
  ...rest
}: FormProps) {
  return (
    <form
      aria-busy={loading ? "true" : undefined}
      data-loading={loading ? "" : undefined}
      {...rest}
    >
      {children}
    </form>
  )
}