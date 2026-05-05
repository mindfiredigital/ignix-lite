export function countEmmetTokens(emmet: string): number {
  let count = 0

  // elements (button, input, label, form)
  const elements = emmet.match(/\b[a-z]+(?=[[{>+#]|$)/g) || []
  count += elements.length

  // id (#id)
  const ids = emmet.match(/#[a-zA-Z0-9_-]+/g) || []
  count += ids.length

  // attributes []
  const attrs = emmet.match(/\[.*?\]/g) || []
  count += attrs.length

  // text {}
  const text = emmet.match(/\{.*?\}/g) || []
  count += text.length

  // operators > +
  const operators = emmet.match(/[>+]/g) || []
  count += operators.length

  return count
}