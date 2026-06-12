import pc from 'picocolors'
import { manifests } from '@mindfiredigital/ignix-lite-engine'

export function infoCommand(component: string) {
  const name = component.toLowerCase().trim()
  const manifest = manifests[name]

  if (!manifest) {
    console.log(pc.red(`\nError: Component "${component}" does not exist.`))
    console.log(
      `Run ${pc.yellow('ignix-lite list')} to see all available components.\n`
    )
    process.exit(1)
  }

  console.log(pc.bold(pc.cyan(`\n📦 Component: <${name.toUpperCase()}>`)))
  console.log(pc.gray('═'.repeat(60)))
  console.log(`${pc.bold('Description:')}    ${manifest.description}`)
  console.log(
    `${pc.bold('HTML Wrapper:')}   ${pc.yellow(`<${manifest.element}>`)}`
  )
  console.log(`${pc.bold('Default Emmet:')}  ${pc.green(manifest.emmet)}`)

  if (manifest.props && Object.keys(manifest.props).length > 0) {
    console.log(pc.bold(pc.blue('\n⚙  Attributes & Options:')))
    console.log(pc.gray('  ' + '─'.repeat(56)))
    Object.entries(manifest.props).forEach(([propName, propDef]) => {
      const typeStr = pc.magenta(propDef.type)
      const valuesStr = propDef.values
        ? pc.dim(` [${propDef.values.join(', ')}]`)
        : ''
      const defaultStr =
        propDef.default !== undefined
          ? ` (default: ${pc.bold(String(propDef.default))})`
          : ''
      console.log(
        `  ${pc.cyan('•')} ${pc.bold(propName.padEnd(15))} ${typeStr}${valuesStr}${defaultStr}`
      )
    })
  }

  if (manifest.slots && Object.keys(manifest.slots).length > 0) {
    console.log(pc.bold(pc.blue('\n📥 Slots:')))
    console.log(pc.gray('  ' + '─'.repeat(56)))
    Object.entries(manifest.slots).forEach(([slotName, slotDef]) => {
      const elementsStr = slotDef.element
        ? pc.dim(` (tags: ${slotDef.element.join(', ')})`)
        : ''
      const requiredStr = slotDef.required ? pc.bold(pc.red(' (required)')) : ''
      console.log(
        `  ${pc.cyan('•')} ${pc.bold(slotName.padEnd(15))} ${requiredStr}${elementsStr}`
      )
    })
  }

  if (manifest.do && manifest.do.length > 0) {
    console.log(pc.bold(pc.green('\n✔ Best Practices (Do):')))
    manifest.do.forEach((rule) => console.log(`  ${pc.green('+')} ${rule}`))
  }
  if (manifest.dont && manifest.dont.length > 0) {
    console.log(pc.bold(pc.red("\n✘ Avoid (Don't):")))
    manifest.dont.forEach((rule) => console.log(`  ${pc.red('-')} ${rule}`))
  }

  console.log()
}
