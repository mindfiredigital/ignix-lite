import { readFileSync, existsSync } from 'fs'
import path from 'path'
import pc from 'picocolors'
import { validateHtml } from '@mindfiredigital/ignix-lite-engine'

export async function validateCommand(filePath: string) {
  const absolutePath = path.resolve(process.cwd(), filePath)

  if (!existsSync(absolutePath)) {
    console.log(pc.red(`Error: File not found at ${filePath}`))
    process.exit(1)
  }

  const html = readFileSync(absolutePath, 'utf8')
  const result = validateHtml(html)

  console.log(pc.bold(pc.cyan(`\n🔍 Validation Report`)))
  console.log(pc.gray('═'.repeat(60)))
  console.log(`${pc.bold('File:')} ${pc.blue(filePath)}`)

  if (result.valid) {
    console.log(
      pc.bold(
        pc.green(
          `\n✔ PASS: All checks passed! Score: ${result.score ?? 100}/100`
        )
      )
    )
  } else {
    console.log(
      pc.bold(
        pc.red(
          `\n✘ FAIL: Validation failed with ${result.errors.length} violation(s)`
        )
      )
    )
    console.log(`${pc.bold('Score:')} ${pc.yellow(`${result.score}/100\n`)}`)

    result.errors.forEach((err, idx) => {
      console.log(pc.bold(pc.red(`[Violation ${idx + 1}]`)))
      console.log(`  ${pc.bold('Line:')}    ${err.line}`)
      console.log(`  ${pc.bold('Element:')} <${err.element}>`)
      console.log(`  ${pc.bold('Problem:')} ${pc.yellow(err.message)}`)
      if (err.fix) {
        console.log(`  ${pc.bold('Fix:')}     ${pc.green(err.fix)}`)
      }
      if (err.suggestedPatch) {
        const patch = err.suggestedPatch
        const details = patch.attribute
          ? ` [${pc.yellow(patch.attribute)}=${pc.magenta(JSON.stringify(patch.value))}]`
          : patch.value !== undefined
            ? ` with value ${pc.magenta(JSON.stringify(patch.value))}`
            : ''
        console.log(
          `  ${pc.bold('Patch:')}   ${pc.cyan(patch.action)} on "${pc.blue(patch.selector)}"${details}`
        )
      }
      console.log()
    })
  }
  console.log()
}
