import { readFileSync, existsSync } from 'fs'
import path from 'path'
import { parse } from 'node-html-parser'
import pc from 'picocolors'

// Reuse the pre-written rules from packages/mcp/src/utils/a11y-rules
import {
  checkImages,
  checkFormLabels,
  checkEmptyLabels,
  checkButtons,
  checkLinks,
  checkAriaStates,
  checkDuplicateIds,
  checkTabIndex,
  checkHeadings,
  checkTables,
  checkDialogs,
  checkRoles,
  checkAutocomplete,
  checkFocusStyle,
  checkLang
} from '../../../mcp/src/utils/a11y-rules.js'

export async function checkA11yCommand(filePath: string) {
  const absolutePath = path.resolve(process.cwd(), filePath)

  if (!existsSync(absolutePath)) {
    console.log(pc.red(`Error: File not found at ${filePath}`))
    process.exit(1)
  }

  const html = readFileSync(absolutePath, 'utf8')
  const root = parse(html)

  const results = [
    checkImages(root),
    checkFormLabels(root),
    checkEmptyLabels(root),
    checkButtons(root),
    checkLinks(root),
    checkAriaStates(root),
    checkDuplicateIds(root),
    checkTabIndex(root),
    checkHeadings(root),
    checkTables(root),
    checkDialogs(root),
    checkRoles(root),
    checkAutocomplete(root),
    checkFocusStyle(root),
    checkLang(root)
  ]

  const issues = results.flatMap((r) => r.issues)
  const passes = results.filter((r) => r.issues.length === 0).map((r) => r.ruleName)
  const errors = issues.filter((i) => i.type === 'error')
  const warnings = issues.filter((i) => i.type === 'warning')
  const score = Math.max(0, 100 - errors.length * 10 - warnings.length * 3)

  console.log(pc.cyan(`\nAccessibility Report for: ${filePath}`))
  console.log(pc.cyan(`======================================`))
  console.log(`Score: ${score}/100 (WCAG 2.2 AA)`)
  console.log(`Passes: ${passes.length} rules, Issues: ${issues.length}\n`)

  if (issues.length === 0) {
    console.log(pc.green(`✔ No accessibility issues found!`))
  } else {
    issues.forEach((issue) => {
      const color = issue.type === 'error' ? pc.red : pc.yellow
      console.log(color(`[${issue.type.toUpperCase()}] ${issue.rule}`))
      console.log(`  Message: ${issue.message}`)
      console.log(`  Element: ${issue.element}`)
      if (issue.fix) console.log(pc.green(`  Fix: ${issue.fix}`))
      console.log()
    })
  }
  console.log()
}
