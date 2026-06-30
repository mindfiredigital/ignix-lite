import { Command } from 'commander'
import { initCommand } from './commands/init.js'
import { themeCommand } from './commands/theme.js'
import { addCommand } from './commands/add.js'
import { validateCommand } from './commands/validate.js'
import { checkA11yCommand } from './commands/check-a11y.js'
import { listCommand } from './commands/list.js'
import { infoCommand } from './commands/info.js'
import { buildCommand } from './commands/build.js'
import { buildValidatedCommand } from './commands/build-validated.js'
import { previewCommand } from './commands/preview.js'
import { mcpSetupCommand, mcpStartCommand } from './commands/mcp.js'
import { agentDocsCommand } from './commands/agent-docs.js'

const program = new Command()

program
  .name('ignix-lite')
  .description(
    'CLI tool for project initialization, component scaffolding, and local validation in Ignix-Lite'
  )
  .version('1.0.0')

program
  .command('init')
  .description('Initialize Ignix-Lite in your project')
  .action(initCommand)

program
  .command('theme [prompt]')
  .description(
    'Generate theme variables based on design prompts or primary color'
  )
  .option('-p, --primary <color>', 'Primary color (hex/hsl) explicitly')
  .option('-s, --style-file <path>', 'Stylesheet target path')
  .action(themeCommand)

program
  .command('add <component>')
  .description('Add or print an Ignix-Lite component template')
  .action(addCommand)

program
  .command('validate <file>')
  .description('Validate a markup file against Ignix-Lite design rules')
  .action(validateCommand)

program
  .command('check-a11y <file>')
  .description('Audit a local markup file for WCAG accessibility issues')
  .action(checkA11yCommand)

program
  .command('list')
  .description('List all available Ignix-Lite components')
  .action(listCommand)
program
  .command('info <component>')
  .description('Show detailed manifest and guidelines for a component')
  .option('--dense', 'Output token-efficient minified format for AI context')
  .action(infoCommand)

program
  .command('agent-docs')
  .description('Generate customized AI agent instruction context files')
  .option(
    '-a, --agent <type>',
    'Target AI assistant type (cursor, claude, codex)',
    'cursor'
  )
  .option(
    '-o, --output-path <path>',
    'Custom directory or file path to write rules'
  )
  .action(agentDocsCommand)

program
  .command('build <prompt>')
  .description('Generate Ignix-Lite HTML/Emmet from a natural language prompt')
  .option('-o, --output <file>', 'Path to write the synthesized HTML output')
  .option('-e, --emmet-only', 'Output the compiled Emmet shorthand only')
  .action(buildCommand)

program
  .command('build-validated <prompt>')
  .description(
    'Generate, validate, and audit accessibility of an Ignix-Lite UI in one command'
  )
  .option('-o, --output <file>', 'Path to write the clean HTML output file')
  .option('-p, --preview', 'Generate a visual PNG preview image')
  .option('-t, --theme <light|dark>', 'Emulated theme for preview', 'light')
  .option('-w, --width <pixels>', 'Viewport width for preview', '400')
  .option('-s, --scale <factor>', 'Device scale factor for preview', '2')
  .action(buildValidatedCommand)

program
  .command('preview <file>')
  .description('Generate a visual PNG preview of an HTML or Emmet file')
  .option('-o, --output <file>', 'Output image destination', 'preview.png')
  .option('-w, --width <pixels>', 'Viewport width', '400')
  .option('-t, --theme <light|dark>', 'Emulated color scheme theme')
  .action(previewCommand)

const mcp = program
  .command('mcp')
  .description('Manage the Ignix-Lite MCP server')

mcp
  .command('setup [client]')
  .description(
    'Configure the MCP server for an editor/client (claude, cursor, gemini)'
  )
  .action(mcpSetupCommand)

mcp
  .command('start')
  .description('Start the Ignix-Lite MCP server')
  .action(mcpStartCommand)

program.parse(process.argv)
