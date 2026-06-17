import { writeFileSync } from 'fs'
import path from 'path'
import pc from 'picocolors'
import { howToBuild } from '@mindfiredigital/ignix-lite-engine'

export async function buildCommand(
  prompt: string,
  options: {
    output?: string
    emmetOnly?: boolean
  }
) {
  const response = await howToBuild(prompt)
  if (!response.content || response.content.length === 0) {
    console.log(
      pc.red('Error: Intent synthesis engine returned an empty response.')
    )
    return
  }

  let data: {
    source: string
    suggestion?: string
    emmet?: string
    html?: string
  }
  try {
    data = JSON.parse(response.content[0].text)
  } catch {
    console.log(
      pc.red('Error: Failed to parse response from intent synthesis engine.')
    )
    return
  }

  if (!data || data.source === 'no-match') {
    console.log(pc.red(`\nCould not synthesize UI for: "${prompt}"`))
    console.log(
      pc.yellow(
        `Suggestion: ${data?.suggestion || 'Try clarifying your request.'}\n`
      )
    )
    return
  }

  const outputContent = options.emmetOnly ? data.emmet : data.html
  if (!outputContent) {
    console.log(
      pc.red('Error: Response does not contain any synthesized code.')
    )
    return
  }

  if (options.output) {
    try {
      const absolutePath = path.resolve(process.cwd(), options.output)
      writeFileSync(absolutePath, outputContent, 'utf8')
      console.log(
        pc.green(`\nSuccessfully wrote output to ${pc.blue(options.output)}\n`)
      )
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      console.log(pc.red(`Error: Failed to write output to file. ${msg}`))
    }
  } else {
    console.log(pc.cyan('\nSynthesized Output:'))
    console.log(outputContent)
    console.log()
  }
}
