import type { ComboboxProps } from "../types/combobox"

export function Combobox({
  intent,
  multiple,
  children,
  ...rest
}: ComboboxProps) {
  return (
    <ix-combobox
      data-intent={intent}
      multiple={multiple ? true : undefined}
      {...rest}
    >
      {children}
    </ix-combobox>
  )
}