import { countEmmetTokens } from "./packages/mcp/src/utils/emmet-tokens.js"

console.log(
  countEmmetTokens("button[data-intent=?]{label}")
)

console.log(
  countEmmetTokens("label>{Label}+input[type=?]")
)

console.log(
  countEmmetTokens("form#id>(label>{Label}+input[type=?])+button[type=submit]{Submit}")
)

console.log(
  countEmmetTokens("label[data-intent? data-size=?]>(input[type=radio]+{label})")
)