import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { spawn } from 'child_process'
import pc from 'picocolors'
import ora from 'ora'

function resolveMcpServerPath(): string {
  try {
    const resolvedUrl = import.meta.resolve('@mindfiredigital/ignix-lite-mcp')
    return fileURLToPath(resolvedUrl)
  } catch {
    return path.resolve(process.cwd(), 'packages/mcp/dist/server.js')
  }
}

export async function mcpSetupCommand(client?: string) {
  const serverPath = resolveMcpServerPath()
  const targetClient = client ? client.toLowerCase().trim() : 'claude'

  if (targetClient === 'claude') {
    const spinner = ora('Configuring Claude Desktop...').start()
    try {
      let configDir = ''
      if (process.platform === 'win32') {
        configDir = path.join(process.env.APPDATA || '', 'Claude')
      } else {
        configDir = path.join(
          process.env.HOME || '',
          'Library',
          'Application Support',
          'Claude'
        )
      }

      if (!existsSync(configDir)) {
        mkdirSync(configDir, { recursive: true })
      }

      const configPath = path.join(configDir, 'claude_desktop_config.json')
      interface ClaudeConfig {
        mcpServers?: Record<string, unknown>
        [key: string]: unknown
      }
      let config: ClaudeConfig = { mcpServers: {} }

      if (existsSync(configPath)) {
        config = JSON.parse(readFileSync(configPath, 'utf-8')) as ClaudeConfig
      }

      if (!config.mcpServers) config.mcpServers = {}

      config.mcpServers['ignix-lite'] = {
        command: 'node',
        args: [serverPath]
      }

      writeFileSync(configPath, JSON.stringify(config, null, 2))
      spinner.succeed(
        pc.green('Successfully added Ignix-Lite to Claude Desktop config!')
      )
      console.log(`Config file updated: ${pc.blue(configPath)}\n`)
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error)
      spinner.fail(pc.red(`Failed to configure Claude Desktop: ${msg}`))
    }
  } else {
    console.log(
      pc.cyan(`\nHow to configure Ignix-Lite MCP in ${pc.bold(client)}:`)
    )
    console.log(
      pc.cyan('========================================================')
    )
    console.log(
      `1. Open your ${pc.bold(client)} editor settings/MCP settings page.`
    )
    console.log(`2. Add a new MCP server with the following values:`)
    console.log(`   - ${pc.bold('Name')}: ignix-lite`)
    console.log(`   - ${pc.bold('Type')}: command`)
    console.log(`   - ${pc.bold('Command')}: node`)
    console.log(`   - ${pc.bold('Arguments')}: ${pc.green(serverPath)}`)
    console.log()
  }
}

export function mcpStartCommand() {
  const serverPath = resolveMcpServerPath()

  console.log(pc.cyan(`\nStarting Ignix-Lite MCP Server...`))
  console.log(`Running: ${pc.green('node ' + serverPath)}\n`)

  const child = spawn('node', [serverPath], { stdio: 'inherit' })

  child.on('close', (code) => {
    if (code !== 0) {
      console.log(pc.red(`\nMCP Server exited with code ${code}`))
    }
  })
}
