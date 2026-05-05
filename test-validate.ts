import { validate } from "./packages/mcp/src/tools/validator.js"

function run(html: string) {
  const res = validate(html)
  const data = JSON.parse(res.content[0].text)

  console.log("\nINPUT:\n", html)
  console.log("OUTPUT:\n", JSON.stringify(data, null, 2))
}

// correct checkbox
run(`<label><input type="checkbox" />Accept</label>`)

//  missing wrapper
run(`<input type="checkbox" />`)

//  forbidden prop
run(`<label><input type="checkbox" variant="fade" /></label>`)

//  invalid value
run(`<label><input type="checkbox" type="radio" /></label>`)