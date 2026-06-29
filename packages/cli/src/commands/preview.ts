import { readFileSync, existsSync, writeFileSync } from 'fs'
import path from 'path'
import pc from 'picocolors'
import ora from 'ora'
import { preview } from '@mindfiredigital/ignix-lite-engine'

export async function previewCommand(
  filePath: string,
  options: { output: string; width: string; theme?: string }
) {
  const absolutePath = path.resolve(process.cwd(), filePath)

  if (!existsSync(absolutePath)) {
    console.log(pc.red(`Error: File not found at ${filePath}`))
    process.exit(1)
  }

  const spinner = ora(
    'Launching headless browser and rendering preview...'
  ).start()

  try {
    const inputContent = readFileSync(absolutePath, 'utf8')
    const widthNum = parseInt(options.width, 10) || 400

    const response = await preview({
      input: inputContent,
      options: {
        width: widthNum,
        theme: options.theme
      }
    })

    if (!response.content || response.content.length === 0) {
      spinner.fail(
        pc.red('Render failed: Received empty response from preview engine.')
      )
      return
    }

    let result: {
      error?: string
      png?: string
    }
    try {
      result = JSON.parse(response.content[0].text)
    } catch {
      spinner.fail(
        pc.red('Render failed: Invalid JSON response from preview engine.')
      )
      return
    }

    if (result.error) {
      spinner.fail(pc.red(`Render failed: ${result.error}`))
      return
    }

    if (!result.png || typeof result.png !== 'string') {
      spinner.fail(
        pc.red('Render failed: Preview engine did not return base64 PNG data.')
      )
      return
    }

    const base64Data = result.png.replace(/^data:image\/png;base64,/, '')
    const buffer = Buffer.from(base64Data, 'base64')

    const outputPath = path.resolve(process.cwd(), options.output)
    writeFileSync(outputPath, buffer)

    spinner.succeed(
      pc.green(
        `Visual preview generated successfully! Saved to ${pc.blue(options.output)}`
      )
    )
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    spinner.fail(pc.red(`Preview failed: ${msg}`))
  }
}
