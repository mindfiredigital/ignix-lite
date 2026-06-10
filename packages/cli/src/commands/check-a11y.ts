import { readFileSync, existsSync } from 'fs'
import path from 'path'
import pc from 'picocolors'
import { auditA11y } from '@mindfiredigital/ignix-lite-engine'

export async function checkA11yCommand(filePath: string) {
  const absolutePath = path.resolve(process.cwd(), filePath)

  if (!existsSync(absolutePath)) {
    console.log(pc.red(`Error: File not found at ${filePath}`))
    process.exit(1)
  }

  const html = readFileSync(absolutePath, 'utf8')
  const result = auditA11y(html)

  console.log(pc.bold(pc.cyan(`\n♿ Accessibility Audit Report`)))
  console.log(pc.gray('═'.repeat(60)))
  console.log(`${pc.bold('File:')}       ${pc.blue(filePath)}`)
  console.log(`${pc.bold('Standards:')}  WCAG 2.2 ${pc.bold(result.wcag)}`)
  console.log(
    `${pc.bold('Summary:')}    Passed ${result.passes.length} rules, Found ${result.issues.length} issue(s)`
  )

  if (result.issues.length === 0) {
    console.log(
      pc.bold(
        pc.green(`\n✔ PASS: No accessibility issues found! Score: 100/100`)
      )
    )
  } else {
    console.log(
      pc.bold(
        pc.red(
          `\n✘ FAIL: Accessibility check failed. Score: ${result.score}/100\n`
        )
      )
    )

    result.issues.forEach((issue, idx) => {
      const isError = issue.type === 'error'
      const labelColor = isError ? pc.red : pc.yellow
      const borderChar = isError ? '✘' : '⚠'

      console.log(
        pc.bold(
          labelColor(
            `[Issue ${idx + 1}] ${borderChar} ${issue.rule} (${issue.type.toUpperCase()})`
          )
        )
      )
      console.log(`  ${pc.bold('Element:')} ${issue.element}`)
      console.log(`  ${pc.bold('Message:')} ${issue.message}`)
      if (issue.fix) {
        console.log(`  ${pc.bold('Fix:')}     ${pc.green(issue.fix)}`)
      }
      console.log()
    })
  }
  console.log()
}
