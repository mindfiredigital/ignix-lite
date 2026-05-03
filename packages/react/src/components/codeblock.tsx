import type { CodeProps } from "../types/codeblock"

export function Code({
  lang,
  children,
  ...rest
}: CodeProps) {
  return (
    <pre>
      <code data-lang={lang} {...rest}>
        {children}
      </code>
    </pre>
  )
}