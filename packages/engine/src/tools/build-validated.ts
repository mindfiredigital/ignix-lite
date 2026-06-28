import { howToBuild } from './intent-engine.js'
import { validateHtml } from './validator.js'
import { auditA11y } from './check-a11y.js'
import { preview } from './preview.js'
import { parse } from 'node-html-parser'
import type { MCPResponse } from '../types.js'

export type BuildValidatedArgs = {
  description: string
  options?: {
    width?: number
    theme?: string
    scale?: number
    preview?: boolean
  }
}

export async function buildValidated(args: BuildValidatedArgs): Promise<MCPResponse> {
  const { description, options = {} } = args

  // Run howToBuild
  const buildResult = await howToBuild(description)

  // no-match or failure cases
  if (!buildResult.content || !buildResult.content[0] || !buildResult.content[0].text) {
    return buildResult
  }

  let parsedBuild: any
  try {
    parsedBuild = JSON.parse(buildResult.content[0].text)
  } catch {
    return buildResult
  }

  if (parsedBuild.error || !parsedBuild.html) {
    return buildResult
  }

  const html = parsedBuild.html

  // Run validation and accessibility audit in an auto-correct loop
  let currentHtml = html
  let validation = validateHtml(currentHtml)
  let a11y = auditA11y(currentHtml)
  let iterations = 0
  const maxIterations = 5

  while ((!validation.valid || a11y.issues.length > 0) && iterations < maxIterations) {
    const patches: any[] = []

    for (const err of validation.errors) {
      if (err.suggestedPatch) {
        patches.push(err.suggestedPatch)
      }
    }
    for (const issue of a11y.issues) {
      if (issue.suggestedPatch) {
        patches.push(issue.suggestedPatch)
      }
    }

    if (patches.length === 0) {
      break
    }

    const root = parse(currentHtml)
    let appliedAny = false

    for (const patch of patches) {
      try {
        const el = root.querySelector(patch.selector)
        if (el) {
          if (patch.action === 'setAttribute' && patch.attribute) {
            el.setAttribute(patch.attribute, patch.value ?? '')
            appliedAny = true
          } else if (patch.action === 'removeAttribute' && patch.attribute) {
            el.removeAttribute(patch.attribute)
            appliedAny = true
          } else if (patch.action === 'replaceOuterHTML' && patch.value !== undefined) {
            const newEl = parse(patch.value)
            el.replaceWith(newEl)
            appliedAny = true
          }
        }
      } catch (err) {
      }
    }

    if (!appliedAny) {
      break
    }

    currentHtml = root.toString()
    validation = validateHtml(currentHtml)
    a11y = auditA11y(currentHtml)
    iterations++
  }

  // Update build HTML with the final clean HTML
  parsedBuild.html = currentHtml

  let previewData = null
  if (options.preview) {
    const previewResult = await preview({
      input: currentHtml,
      options: {
        width: options.width,
        theme: options.theme,
        scale: options.scale
      }
    })

    if (previewResult.content && previewResult.content[0] && previewResult.content[0].text) {
      try {
        previewData = JSON.parse(previewResult.content[0].text)
      } catch {
      }
    }
  }

  const finalResult = {
    ...parsedBuild,
    validation,
    accessibility: a11y,
    preview: previewData
  }

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(finalResult)
      }
    ]
  }
}
