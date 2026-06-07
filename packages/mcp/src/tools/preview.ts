/* eslint-disable @typescript-eslint/no-unused-vars */
import puppeteer from 'puppeteer'
import { readFileSync, existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { expandEmmet } from '../utils/emmet-helpers.js'
import type { MCPResponse } from '../types.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export type PreviewOptions = {
  width?: number
  theme?: string
  scale?: number
}

export type PreviewArgs = {
  input: string
  options?: PreviewOptions
}

export async function preview(args: PreviewArgs): Promise<MCPResponse> {
  const start = Date.now()
  const { input, options = {} } = args
  const { width = 400, scale = 2, theme } = options

  // Sanitize width and scale to prevent Chromium emulation protocol crashes on non-positive values
  const sanitizedWidth = typeof width === 'number' && width > 0 ? width : 400
  const sanitizedScale = typeof scale === 'number' && scale > 0 ? scale : 2

  // Expand Emmet to HTML if it doesn't look like standard HTML
  const html = input.trim().startsWith('<') ? input : expandEmmet(input)

  // Resolve CSS path by searching upwards for workspace root directory
  let currentDir = __dirname
  let rootDir = ''
  for (let i = 0; i < 6; i++) {
    if (
      existsSync(path.join(currentDir, 'pnpm-workspace.yaml')) ||
      (existsSync(path.join(currentDir, 'package.json')) &&
        existsSync(path.join(currentDir, 'packages')))
    ) {
      rootDir = currentDir
      break
    }
    const parent = path.dirname(currentDir)
    if (parent === currentDir) break
    currentDir = parent
  }

  let cssPath = ''
  if (rootDir) {
    cssPath = path.join(rootDir, 'packages/core/dist/ignix-lite.min.css')
  }

  // Fallback options
  if (!cssPath || !existsSync(cssPath)) {
    cssPath = path.resolve(
      process.cwd(),
      'packages/core/dist/ignix-lite.min.css'
    )
  }
  if (!existsSync(cssPath)) {
    cssPath = path.resolve(process.cwd(), '../core/dist/ignix-lite.min.css')
  }
  if (!existsSync(cssPath)) {
    cssPath = path.resolve(__dirname, '../../../core/dist/ignix-lite.min.css')
  }

  let cssContent = ''
  if (existsSync(cssPath)) {
    cssContent = readFileSync(cssPath, 'utf8')
  } else {
    console.warn(`[preview] CSS file not found at: ${cssPath}`)
  }

  let browser
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    const page = await browser.newPage()
    await page.setJavaScriptEnabled(false)
    await page.setRequestInterception(true)
    page.on('request', (req) => {
      const url = req.url()
      if (url.startsWith('data:') || url === 'about:blank') {
        req.continue()
      } else {
        req.abort()
      }
    })

    if (theme === 'dark' || theme === 'light') {
      await page.emulateMediaFeatures([
        { name: 'prefers-color-scheme', value: theme }
      ])
    }
    await page.setViewport({
      width: sanitizedWidth,
      height: 600,
      deviceScaleFactor: sanitizedScale
    })

    // Set page content with Ignix-Lite styles injected
    const pageContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; img-src data:;">
          <style>
            body {
              margin: 0;
              padding: 16px;
              background-color: var(--ix-surface, #f9fafb);
              font-family: var(--ix-font, sans-serif);
            }
            #preview-container {
              display: flex;
              justify-content: center;
              align-items: center;
              flex-wrap: wrap;
              gap: 16px;
              width: 100%;
              box-sizing: border-box;
            }
            ${cssContent}
          </style>
        </head>
        <body>
          <div id="preview-container">${html}</div>
        </body>
      </html>
    `
    await page.setContent(pageContent, { waitUntil: 'load' })

    // Take screenshot of container
    const container = await page.$('#preview-container')
    let base64Png = ''
    if (container) {
      try {
        base64Png = (await container.screenshot({
          encoding: 'base64'
        })) as string
      } catch (error) {
        // Fallback to taking a full page screenshot if container has 0 size or fails
        base64Png = (await page.screenshot({ encoding: 'base64' })) as string
      }
    } else {
      base64Png = (await page.screenshot({ encoding: 'base64' })) as string
    }

    const duration = Date.now() - start

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            png: `data:image/png;base64,${base64Png}`,
            width: sanitizedWidth,
            render_ms: duration,
            tokens_used: 5
          })
        }
      ]
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error('[preview] Render failed:', error)
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            error: `Preview render failed: ${errorMessage}`,
            tokens_used: 5
          })
        }
      ]
    }
  } finally {
    if (browser) {
      await browser.close()
    }
  }
}
