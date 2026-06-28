/* eslint-disable @typescript-eslint/no-unused-vars */
import { chromium, webkit } from 'playwright'
import { readFileSync, existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { expandEmmet } from '../utils/emmet-helpers.js'
import { parse } from 'node-html-parser'
import type { MCPResponse } from '../types.js'

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;'
      case '>': return '&gt;'
      case '&': return '&amp;'
      case '\'': return '&apos;'
      case '"': return '&quot;'
      default: return c
    }
  })
}

function htmlToSvg(html: string, width: number): string {
  const root = parse(html)
  let currentY = 20
  const svgElements: string[] = []
  
  const drawElement = (node: any, indent: number, xOffset: number, parentWidth: number) => {
    if (node.nodeType !== 1) return
    const tagName = node.tagName?.toLowerCase()
    
    const intent = node.getAttribute('data-intent') || 'primary'
    const intentColors: Record<string, { bg: string, border: string, text: string }> = {
      primary: { bg: '#2563eb', border: '#1d4ed8', text: '#ffffff' },
      danger: { bg: '#dc2626', border: '#b91c1c', text: '#ffffff' },
      warning: { bg: '#f59e0b', border: '#d97706', text: '#ffffff' },
      success: { bg: '#10b981', border: '#047857', text: '#ffffff' },
      neutral: { bg: '#f3f4f6', border: '#e5e7eb', text: '#374151' },
      ghost: { bg: 'transparent', border: 'transparent', text: '#4b5563' }
    }
    
    const colors = intentColors[intent] || intentColors.primary
    
    if (tagName === 'button') {
      const textContent = escapeXml(node.text?.trim() || 'Button')
      svgElements.push(
        `<g transform="translate(${xOffset}, ${currentY})">`,
        `  <rect width="100" height="36" rx="6" fill="${colors.bg}" stroke="${colors.border}" stroke-width="1" />`,
        `  <text x="50" y="22" font-size="12" font-family="sans-serif" font-weight="bold" fill="${colors.text}" text-anchor="middle">${textContent}</text>`,
        `</g>`
      )
      currentY += 46
    } else if (tagName === 'aside') {
      const textContent = escapeXml(node.text?.trim() || 'Alert message')
      const alertColors = intent === 'danger' ? { bg: '#fee2e2', border: '#fca5a5', text: '#991b1b' } :
                          intent === 'warning' ? { bg: '#fef3c7', border: '#fcd34d', text: '#92400e' } :
                          intent === 'success' ? { bg: '#d1fae5', border: '#6ee7b7', text: '#065f46' } :
                                                 { bg: '#dbeafe', border: '#93c5fd', text: '#1e40af' }
      svgElements.push(
        `<g transform="translate(${xOffset}, ${currentY})">`,
        `  <rect width="${parentWidth - 40}" height="48" rx="6" fill="${alertColors.bg}" stroke="${alertColors.border}" stroke-width="1" />`,
        `  <text x="16" y="28" font-size="12" font-family="sans-serif" fill="${alertColors.text}">${textContent}</text>`,
        `</g>`
      )
      currentY += 58
    } else if (tagName === 'details') {
      const rawSummary = node.querySelector('summary')?.text?.trim() || 'Accordion Title'
      const rawContent = node.querySelector('p')?.text?.trim() || node.text?.replace(rawSummary, '').trim() || 'Accordion Content'
      const summary = escapeXml(rawSummary)
      const content = escapeXml(rawContent)
      const open = node.hasAttribute('open')
      
      svgElements.push(
        `<g transform="translate(${xOffset}, ${currentY})">`,
        `  <rect width="${parentWidth - 40}" height="${open ? 80 : 36}" rx="6" fill="#ffffff" stroke="#e5e7eb" stroke-width="1" />`,
        `  <text x="16" y="22" font-size="12" font-family="sans-serif" font-weight="bold" fill="#111827">${open ? '▼' : '►'} ${summary}</text>`
      )
      if (open) {
        svgElements.push(
          `  <line x1="0" y1="36" x2="${parentWidth - 40}" y2="36" stroke="#e5e7eb" stroke-width="1" />`,
          `  <text x="16" y="58" font-size="12" font-family="sans-serif" fill="#4b5563">${content}</text>`
        )
      }
      svgElements.push(`</g>`)
      currentY += open ? 90 : 46
    } else if (tagName === 'article') {
      const title = escapeXml(node.querySelector('[slot=title]')?.text?.trim() || 'Card Title')
      const body = escapeXml(node.querySelector('[slot=body]')?.text?.trim() || 'Card Body text content')
      svgElements.push(
        `<g transform="translate(${xOffset}, ${currentY})">`,
        `  <rect width="${parentWidth - 40}" height="120" rx="8" fill="#ffffff" stroke="#e5e7eb" stroke-width="1" />`,
        `  <text x="20" y="32" font-size="14" font-family="sans-serif" font-weight="bold" fill="#111827">${title}</text>`,
        `  <text x="20" y="60" font-size="12" font-family="sans-serif" fill="#4b5563">${body}</text>`,
        `</g>`
      )
      currentY += 132
    } else if (tagName === 'mark') {
      const textContent = escapeXml(node.text?.trim() || 'Badge')
      svgElements.push(
        `<g transform="translate(${xOffset}, ${currentY})">`,
        `  <rect width="60" height="20" rx="10" fill="${colors.bg}" stroke="${colors.border}" stroke-width="1" />`,
        `  <text x="30" y="14" font-size="10" font-family="sans-serif" font-weight="bold" fill="${colors.text}" text-anchor="middle">${textContent}</text>`,
        `</g>`
      )
      currentY += 30
    } else if (tagName === 'nav') {
      const navText = escapeXml(node.text?.trim().replace(/\s+/g, ' ') || '')
      svgElements.push(
        `<g transform="translate(${xOffset}, ${currentY})">`,
        `  <rect width="${parentWidth - 40}" height="32" rx="4" fill="#f3f4f6" />`,
        `  <text x="16" y="20" font-size="12" font-family="sans-serif" fill="#4b5563">Navigation: ${navText}</text>`,
        `</g>`
      )
      currentY += 42
    } else if (tagName === 'input') {
      const placeholder = escapeXml(node.getAttribute('placeholder') || 'Enter text...')
      svgElements.push(
        `<g transform="translate(${xOffset}, ${currentY})">`,
        `  <rect width="${parentWidth - 40}" height="36" rx="6" fill="#ffffff" stroke="#d1d5db" stroke-width="1" />`,
        `  <text x="12" y="22" font-size="12" font-family="sans-serif" fill="#9ca3af">${placeholder}</text>`,
        `</g>`
      )
      currentY += 46
    } else {
      for (const child of node.childNodes) {
        drawElement(child, indent + 1, xOffset, parentWidth)
      }
    }
  }

  for (const child of root.childNodes) {
    drawElement(child, 0, 20, width)
  }

  const height = Math.max(150, currentY + 20)

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" style="background-color:#f9fafb; font-family:system-ui, -apple-system, sans-serif;">`,
    `  <rect width="100%" height="100%" fill="#f9fafb" />`,
    `  <text x="20" y="25" font-size="10" fill="#9ca3af" font-weight="bold" letter-spacing="1">IGNIX-LITE FALLBACK PREVIEW</text>`,
    `  <g transform="translate(0, 20)">`,
    ...svgElements.map(line => '    ' + line),
    `  </g>`,
    `</svg>`
  ].join('\n')
}

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

  // Sanitize width and scale to prevent emulation protocol crashes on non-positive values
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
    browser = await webkit.launch({
      headless: true
    })

    const context = await browser.newContext({
      javaScriptEnabled: false,
      viewport: {
        width: sanitizedWidth,
        height: 600
      },
      deviceScaleFactor: sanitizedScale,
      colorScheme: (theme === 'dark' || theme === 'light') ? theme : undefined
    })

    const page = await context.newPage()

    // Route interception (SSRF Mitigation & Sandbox Hardening)
    // Only allow data URIs and about:blank. Block all outgoing HTTP/HTTPS traffic.
    await page.route('**/*', (route) => {
      const url = route.request().url()
      if (url.startsWith('data:') || url === 'about:blank') {
        route.continue()
      } else {
        route.abort()
      }
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
    const container = page.locator('#preview-container')
    let base64Png = ''
    try {
      const buffer = await container.screenshot()
      base64Png = buffer.toString('base64')
    } catch (error) {
      // Fallback to taking a full page screenshot if container has 0 size or fails
      const buffer = await page.screenshot()
      base64Png = buffer.toString('base64')
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
    console.warn('[preview] Headless render failed, falling back to static SVG preview:', errorMessage)
    
    try {
      const svgString = htmlToSvg(html, sanitizedWidth)
      const base64Svg = Buffer.from(svgString).toString('base64')
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              png: `data:image/svg+xml;base64,${base64Svg}`,
              svg: svgString,
              width: sanitizedWidth,
              render_ms: Date.now() - start,
              fallback: true,
              tokens_used: 3
            })
          }
        ]
      }
    } catch (fallbackError) {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              error: `Preview render and SVG fallback both failed. Render error: ${errorMessage}. Fallback error: ${String(fallbackError)}`,
              tokens_used: 5
            })
          }
        ]
      }
    }
  } finally {
    if (browser) {
      await browser.close()
    }
  }
}
