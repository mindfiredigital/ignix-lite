import { writeFileSync, mkdirSync } from 'fs'
import path from 'path'
import pc from 'picocolors'
import { manifests } from '@mindfiredigital/ignix-lite-engine'

interface AgentDocsOptions {
  agent: 'cursor' | 'claude' | 'codex'
  outputPath?: string
}

export function agentDocsCommand(options: AgentDocsOptions) {
  const agentType = options.agent || 'cursor'
  
  let fileName = '.cursorrules'
  if (agentType === 'claude') {
    fileName = 'CLAUDE.md'
  } else if (agentType === 'codex') {
    fileName = 'AGENTS.md'
  }

  const targetPath = options.outputPath 
    ? path.resolve(process.cwd(), options.outputPath)
    : path.resolve(process.cwd(), fileName)

  const rulesContent = generateRulesContent(agentType)

  try {
    const dir = path.dirname(targetPath)
    mkdirSync(dir, { recursive: true })
    writeFileSync(targetPath, rulesContent, 'utf8')
    console.log(pc.green(`\n✔ Agent docs successfully written to ${targetPath}\n`))
  } catch (err: any) {
    console.log(pc.red(`\nError: Failed to write agent docs: ${err.message}\n`))
    process.exit(1)
  }
}

function generateRulesContent(agentType: string): string {
  let content = `# Ignix Lite AI System Instructions & Reference\n\n`
  
  content += `Ignix Lite is a minimal, browser-native classless UI library driven entirely by semantic HTML and data-* attributes (Zero CSS classes, Zero JS dependency).\n\n`
  
  content += `## Core Design Rules (THE ONE RULE)\n`
  content += `1. **Zero Class Names**: NEVER use "class" or inline styles for layout/variants. Styling is applied directly to native elements.\n`
  content += `2. **Data Intents**: Use "data-intent" for visual variants (e.g. \`data-intent="primary"\`).\n`
  content += `3. **Native HTML Attributes for State**: Use standard HTML attributes (e.g. \`disabled\`, \`checked\`, \`required\`, \`open\`, \`aria-busy="true"\`, \`aria-invalid="true"\`) to manage component state.\n`
  content += `4. **Clean Elements & No Divs**: Generic \`<div>\` elements are strictly forbidden across all components and slots (such as tab panels or card content). The only exception is the \`<layout>\` primitive (which renders as a \`<div>\` with \`data-layout\`). Always use semantic tags like \`<section>\`, \`<article>\`, \`<nav>\`, \`<aside>\`, etc., directly.\n\n`

  content += `## Component Catalog Reference\n\n`
  
  Object.entries(manifests).forEach(([name, manifest]) => {
    content += `### Component: <${name}>\n`
    content += `* **Description**: ${manifest.description || 'No description'}\n`
    content += `* **HTML Tag / Element**: \`<${manifest.element}>\`\n`
    content += `* **Default Emmet**: \`${manifest.emmet}\`\n`
    
    if (manifest.props && Object.keys(manifest.props).length > 0) {
      content += `* **Allowed Attributes**:\n`
      Object.entries(manifest.props).forEach(([propName, propDef]) => {
        const valsStr = propDef.values ? ` (values: ${propDef.values.join(', ')})` : ''
        const defStr = propDef.default !== undefined ? ` (default: ${propDef.default})` : ''
        content += `  - \`${propName}\` (${propDef.type})${valsStr}${defStr}\n`
      })
    }
    
    if (manifest.slots && Object.keys(manifest.slots).length > 0) {
      content += `* **Slots**:\n`
      Object.entries(manifest.slots).forEach(([slotName, slotDef]) => {
        const reqStr = slotDef.required ? ' (required)' : ''
        content += `  - \`slot="${slotName}"\`${reqStr}\n`
      })
    }

    if (manifest.do && manifest.do.length > 0) {
      content += `* **Best Practices (Do)**:\n`
      manifest.do.forEach(rule => {
        content += `  - ${rule}\n`
      })
    }
    if (manifest.dont && manifest.dont.length > 0) {
      content += `* **Avoid (Don't)**:\n`
      manifest.dont.forEach(rule => {
        content += `  - ${rule}\n`
      })
    }
    content += `\n`
  })

  return content
}
