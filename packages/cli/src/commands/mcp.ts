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

/** Read a JSON file safely; returns {} if not found or invalid */
function readJson(filePath: string): Record<string, unknown> {
    try {
        return JSON.parse(readFileSync(filePath, 'utf-8'))
    } catch {
        return {}
    }
}

/** Write a JSON file, creating parent directories as needed */
function writeJson(filePath: string, data: unknown): void {
    mkdirSync(path.dirname(filePath), { recursive: true })
    writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
}

/** The shared MCP server entry */
function mcpEntry(serverPath: string) {
    return {
        command: 'node',
        args: [serverPath]
    }
}


function setupClaudeDesktop(serverPath: string): void {
    const spinner = ora('Configuring Claude Desktop...').start()
    try {
        const configDir =
            process.platform === 'win32'
                ? path.join(process.env.APPDATA || '', 'Claude')
                : path.join(
                    process.env.HOME || '',
                    'Library',
                    'Application Support',
                    'Claude'
                )
        const configPath = path.join(configDir, 'claude_desktop_config.json')
        const config = readJson(configPath) as { mcpServers?: Record<string, unknown> }
        config.mcpServers = config.mcpServers || {}
        config.mcpServers['ignix-lite'] = mcpEntry(serverPath)
        writeJson(configPath, config)
        spinner.succeed(pc.green('Claude Desktop configured successfully!'))
        console.log(pc.gray(`  Config: ${configPath}`))
        console.log(pc.yellow('\n  ⚡ Restart Claude Desktop to apply changes.\n'))
    } catch (err) {
        const msg = err instanceof Error ? err.message : String(err)
        spinner.fail(pc.red(`Failed to configure Claude Desktop: ${msg}`))
    }
}

function setupClaudeCode(serverPath: string): void {
    const spinner = ora('Configuring Claude Code (claude CLI)...').start()
    try {
        // User-level config: ~/.claude.json
        const configPath =
            process.platform === 'win32'
                ? path.join(process.env.USERPROFILE || '', '.claude.json')
                : path.join(process.env.HOME || '', '.claude.json')

        const config = readJson(configPath) as {
            mcpServers?: Record<string, unknown>
        }
        config.mcpServers = config.mcpServers || {}
        config.mcpServers['ignix-lite'] = mcpEntry(serverPath)
        writeJson(configPath, config)
        spinner.succeed(pc.green('Claude Code configured successfully!'))
        console.log(pc.gray(`  Config: ${configPath}`))
        console.log(
            pc.yellow(
                '\n  ⚡ Run "claude" in any project to start using Ignix-Lite tools.\n'
            )
        )
    } catch (err) {
        const msg = err instanceof Error ? err.message : String(err)
        spinner.fail(pc.red(`Failed to configure Claude Code: ${msg}`))
    }
}

function setupGemini(serverPath: string): void {
    const spinner = ora('Configuring Gemini CLI...').start()
    try {
        // Gemini CLI reads ~/.gemini/settings.json
        const configDir =
            process.platform === 'win32'
                ? path.join(process.env.USERPROFILE || '', '.gemini')
                : path.join(process.env.HOME || '', '.gemini')
        const configPath = path.join(configDir, 'settings.json')

        const config = readJson(configPath) as {
            mcpServers?: Record<string, unknown>
        }
        config.mcpServers = config.mcpServers || {}
        config.mcpServers['ignix-lite'] = mcpEntry(serverPath)
        writeJson(configPath, config)
        spinner.succeed(pc.green('Gemini CLI configured successfully!'))
        console.log(pc.gray(`  Config: ${configPath}`))
        console.log(
            pc.yellow(
                '\n  ⚡ Start a new Gemini CLI session to activate Ignix-Lite tools.\n'
            )
        )
    } catch (err) {
        const msg = err instanceof Error ? err.message : String(err)
        spinner.fail(pc.red(`Failed to configure Gemini CLI: ${msg}`))
    }
}

function setupCursor(serverPath: string): void {
    const spinner = ora('Configuring Cursor...').start()
    try {
        // Cursor reads ~/.cursor/mcp.json (global scope)
        const configDir =
            process.platform === 'win32'
                ? path.join(process.env.USERPROFILE || '', '.cursor')
                : path.join(process.env.HOME || '', '.cursor')
        const configPath = path.join(configDir, 'mcp.json')

        const config = readJson(configPath) as {
            mcpServers?: Record<string, unknown>
        }
        config.mcpServers = config.mcpServers || {}
        config.mcpServers['ignix-lite'] = mcpEntry(serverPath)
        writeJson(configPath, config)
        spinner.succeed(pc.green('Cursor configured successfully!'))
        console.log(pc.gray(`  Config: ${configPath}`))
        console.log(
            pc.yellow(
                '\n  ⚡ Reload Cursor (Ctrl+Shift+P → "Reload Window") to activate Ignix-Lite tools.\n'
            )
        )
    } catch (err) {
        const msg = err instanceof Error ? err.message : String(err)
        spinner.fail(pc.red(`Failed to configure Cursor: ${msg}`))
    }
}


const SUPPORTED_CLIENTS = ['claude', 'claude-desktop', 'claude-code', 'gemini', 'cursor']

export async function mcpSetupCommand(client?: string): Promise<void> {
    const serverPath = resolveMcpServerPath()
    const target = (client || '').toLowerCase().trim()

    if (!target) {
        console.log(pc.cyan('\nWhich client do you want to configure?\n'))
        console.log(`  ${pc.bold('claude')}          Claude Desktop       (auto-configure)`)
        console.log(`  ${pc.bold('claude-code')}     Claude Code CLI      (auto-configure)`)
        console.log(`  ${pc.bold('gemini')}          Gemini CLI           (auto-configure)`)
        console.log(`  ${pc.bold('cursor')}          Cursor editor        (auto-configure)`)
        console.log()
        console.log(
            pc.gray(
                'Usage: ignix-lite mcp setup <client>  (e.g. ignix-lite mcp setup cursor)'
            )
        )
        console.log()
        return
    }

    switch (target) {
        case 'claude':
        case 'claude-desktop':
            setupClaudeDesktop(serverPath)
            break

        case 'claude-code':
            setupClaudeCode(serverPath)
            break

        case 'gemini':
            setupGemini(serverPath)
            break

        case 'cursor':
            setupCursor(serverPath)
            break

        default:
            console.log(pc.red(`\nUnknown client: "${client}"\n`))
            console.log(`Supported clients: ${pc.bold(SUPPORTED_CLIENTS.join(', '))}`)
            console.log()
    }
}

export function mcpStartCommand(): void {
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
