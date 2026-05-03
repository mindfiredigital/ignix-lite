import { ButtonProps } from '../types/button';

export function Button({
  intent,
  loading,
  invalid,
  disabled,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      data-intent={intent}
      disabled={disabled}
      aria-busy={loading ? "true" : undefined}
      aria-invalid={invalid ? "true" : undefined}
      {...rest}
    >
      {children}
    </button>
  )
}