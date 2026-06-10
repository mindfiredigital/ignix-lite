import fs from 'fs'
import path from 'path'
import pc from 'picocolors'
import ora from 'ora'
import { resolveTokens, buildCss } from '@mindfiredigital/ignix-lite-engine'

export async function themeCommand(
  prompt?: string,
  options: { primary?: string; styleFile?: string } = {}
) {
  const spinner = ora('Generating theme tokens...').start()

  let stylePath = options.styleFile

  if (!stylePath) {
    const configPath = 'ignix.config.json'
    if (!fs.existsSync(configPath)) {
      spinner.fail(
        pc.red(
          'ignix.config.json not found. Run "ignix-lite init" first or specify --style-file.'
        )
      )
      return
    }

    try {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'))
      stylePath = config.style
    } catch {
      spinner.fail(pc.red('Failed to read ignix.config.json.'))
      return
    }
  }

  if (!stylePath) {
    spinner.fail(
      pc.red('Style path not configured. Specify -s or --style-file option.')
    )
    return
  }

  const queryParts = [prompt || '', options.primary || ''].filter(Boolean)
  const query = queryParts.join(' ').trim()

  if (!query) {
    spinner.fail(
      pc.yellow(
        'Please provide a prompt or primary color, e.g.: ignix-lite theme "dark round blue"'
      )
    )
    return
  }

  try {
    const tokens = resolveTokens(query)
    const cssBlock = buildCss(tokens)

    const absoluteStylePath = path.resolve(process.cwd(), stylePath)
    const cssDir = path.dirname(absoluteStylePath)

    if (!fs.existsSync(cssDir)) {
      fs.mkdirSync(cssDir, { recursive: true })
    }

    const themeRegex =
      /\/\* Ignix-Lite Custom Theme Variables \*\/[\s\S]*?\}\n?/

    if (fs.existsSync(absoluteStylePath)) {
      let content = fs.readFileSync(absoluteStylePath, 'utf-8')
      if (themeRegex.test(content)) {
        content = content.replace(themeRegex, cssBlock + '\n')
      } else {
        content = cssBlock + '\n\n' + content
      }
      fs.writeFileSync(absoluteStylePath, content)
    } else {
      fs.writeFileSync(absoluteStylePath, cssBlock)
    }

    spinner.succeed(
      pc.green(`Theme successfully updated in ${pc.blue(stylePath)}`)
    )
    console.log(pc.gray(`Resolved primary color: ${tokens.resolvedPrimary}`))
    console.log(pc.gray(`Mode: ${tokens.isDark ? 'Dark' : 'Light'}\n`))
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    spinner.fail(pc.red(`Failed to generate theme: ${msg}`))
  }
}
