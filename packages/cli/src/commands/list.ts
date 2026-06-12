import pc from 'picocolors'
import { manifests } from '@mindfiredigital/ignix-lite-engine'

export function listCommand() {
  const components = Object.keys(manifests).sort()

  console.log(pc.bold(pc.cyan('\n🔥 Ignix-Lite Components Catalog')))
  console.log(pc.gray('═'.repeat(70)))

  components.forEach((name) => {
    const desc =
      manifests[name].description || pc.gray('No description available')
    console.log(
      `  ${pc.bold(pc.green('●'))} ${pc.bold(name.padEnd(15))} ${pc.dim('→')} ${desc}`
    )
  })

  console.log(pc.gray('═'.repeat(70)))
  console.log(
    pc.cyan(`Total: ${pc.bold(components.length)} components ready to use!\n`)
  )
}
