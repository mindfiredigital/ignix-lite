import type { TableProps } from "../types/table"

export function Table({
  children,
  ...rest
}: TableProps) {
  return <table {...rest}>{children}</table>
}