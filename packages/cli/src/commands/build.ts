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

  const data = JSON.parse(response.content[0].text)

  if (data.source === 'no-match') {
    console.log(pc.red(`\nCould not synthesize UI for: "${prompt}"`))
    console.log(pc.yellow(`Suggestion: ${data.suggestion}\n`))

    return
  }

  const outputContent = options.emmetOnly ? data.emmet : data.html

  if (options.output) {
    const absolutePath = path.resolve(process.cwd(), options.output)
    writeFileSync(absolutePath, outputContent, 'utf8')
    console.log(
      pc.green(`\nSuccessfully wrote output to ${pc.blue(options.output)}\n`)
    )
  } else {
    console.log(pc.cyan('\nSynthesized Output:'))
    console.log(outputContent)
    console.log()
  }
}
