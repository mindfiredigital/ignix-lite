import { writeFileSync } from 'fs'
import path from 'path'
import pc from 'picocolors'
import { buildValidated } from '@mindfiredigital/ignix-lite-engine'

interface SuggestedPatch {
  selector: string
  action: 'setAttribute' | 'removeAttribute' | 'replaceOuterHTML' | string
  attribute?: string
  value?: unknown
}

interface ValidationError {
  line: number | string
  element: string
  message: string
  fix?: string
  suggestedPatch?: SuggestedPatch
}

interface ValidationReport {
  valid: boolean
  score: number
  errors: ValidationError[]
}

interface A11yIssue {
  type: 'error' | 'warning' | string
  rule: string
  element: string
  message: string
  fix?: string
  suggestedPatch?: SuggestedPatch
}

interface A11yReport {
  wcag: string
  score: number
  passes: string[]
  issues: A11yIssue[]
}

interface PreviewReport {
  error?: string
  png?: string
}

interface BuildValidatedResult {
  source?: string
  error?: string
  suggestion?: string
  emmet?: string
  confidence?: number
  html?: string
  validation?: ValidationReport
  accessibility?: A11yReport
  preview?: PreviewReport
}

export async function buildValidatedCommand(
  prompt: string,
  options: {
    output?: string
    preview?: boolean
    width?: string
    theme?: string
    scale?: string
  }
) {
  const widthVal = options.width ? parseInt(options.width, 10) : 400
  const scaleVal = options.scale ? parseInt(options.scale, 10) : 2

  console.log(pc.cyan('\nStarting Ignix-Lite build-validated pipeline...'))

  const response = await buildValidated({
    description: prompt,
    options: {
      preview: options.preview,
      width: widthVal,
      theme: options.theme,
      scale: scaleVal
    }
  })

  if (!response.content || response.content.length === 0) {
    console.log(pc.red('Error: Pipeline returned an empty response.'))
    return
  }

  let data: BuildValidatedResult
  try {
    data = JSON.parse(response.content[0].text) as BuildValidatedResult
  } catch {
    console.log(pc.red('Error: Failed to parse response from pipeline.'))
    return
  }

  if (data.source === 'no-match' || data.error) {
    console.log(pc.red(`\nCould not synthesize UI for: "${prompt}"`))
    console.log(
      pc.yellow(
        `Suggestion: ${data.suggestion || data.error || 'Try clarifying your request.'}\n`
      )
    )
    return
  }

  // 1. Output generated HTML / Emmet
  console.log(pc.bold(pc.cyan('\n🔨 Synthesized UI Assets')))
  console.log(pc.gray('═'.repeat(60)))
  console.log(`${pc.bold('Emmet Shorthand:')} ${pc.green(data.emmet || '')}`)
  console.log(
    `${pc.bold('Confidence Score:')} ${pc.yellow((data.confidence || 0) * 100)}%`
  )
  console.log(pc.bold('\nGenerated HTML Markup:'))
  console.log(pc.gray('─'.repeat(40)))
  console.log(data.html || '')
  console.log(pc.gray('─'.repeat(40)))

  // 2. Validation Report
  const val = data.validation
  console.log(pc.bold(pc.cyan(`\n🔍 Design Compliance Validation`)))
  console.log(pc.gray('═'.repeat(60)))
  if (val) {
    if (val.valid) {
      console.log(
        pc.bold(pc.green(`✔ PASS: All checks passed! Score: ${val.score}/100`))
      )
    } else {
      console.log(
        pc.bold(
          pc.red(
            `✘ FAIL: Validation failed with ${val.errors.length} violation(s)`
          )
        )
      )
      console.log(`${pc.bold('Score:')} ${pc.yellow(`${val.score}/100\n`)}`)

      val.errors.forEach((err: ValidationError, idx: number) => {
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
  }

  // 3. Accessibility Report
  const a11y = data.accessibility
  console.log(pc.bold(pc.cyan(`\n♿ Accessibility Audit Report`)))
  console.log(pc.gray('═'.repeat(60)))
  if (a11y) {
    console.log(`${pc.bold('Standards:')}  WCAG 2.2 ${pc.bold(a11y.wcag)}`)
    console.log(
      `${pc.bold('Summary:')}    Passed ${a11y.passes.length} rules, Found ${a11y.issues.length} issue(s)`
    )

    if (a11y.issues.length === 0) {
      console.log(
        pc.bold(
          pc.green(`✔ PASS: No accessibility issues found! Score: 100/100`)
        )
      )
    } else {
      console.log(
        pc.bold(
          pc.red(
            `✘ FAIL: Accessibility check failed. Score: ${a11y.score}/100\n`
          )
        )
      )

      a11y.issues.forEach((issue: A11yIssue, idx: number) => {
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
        if (issue.suggestedPatch) {
          const patch = issue.suggestedPatch
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
  }

  // 4. Handle Output HTML File
  if (options.output && data.html) {
    try {
      const absolutePath = path.resolve(process.cwd(), options.output)
      writeFileSync(absolutePath, data.html, 'utf8')
      console.log(
        pc.green(
          `\n✔ Successfully wrote output HTML to ${pc.blue(options.output)}`
        )
      )
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      console.log(pc.red(`\nError: Failed to write output file: ${msg}`))
    }
  }

  // 5. Handle Visual Preview File
  if (options.preview && data.preview) {
    if (data.preview.error) {
      console.log(
        pc.red(
          `\nError: Visual preview generation failed: ${data.preview.error}`
        )
      )
    } else if (data.preview.png) {
      try {
        const base64Data = data.preview.png.replace(
          /^data:image\/png;base64,/,
          ''
        )
        const previewPath = path.resolve(process.cwd(), 'preview.png')
        writeFileSync(previewPath, Buffer.from(base64Data, 'base64'))
        console.log(
          pc.green(
            `✔ Successfully saved layout preview image to ${pc.blue('preview.png')}`
          )
        )
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err)
        console.log(pc.red(`\nError: Failed to save preview image: ${msg}`))
      }
    }
  }
  console.log()
}
