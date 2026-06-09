import { Command } from 'commander'
import { initCommand } from './commands/init.js'
import { themeCommand } from './commands/theme.js'
import { addCommand } from './commands/add.js'
import { validateCommand } from './commands/validate.js'
import { checkA11yCommand } from './commands/check-a11y.js'

const program = new Command()

program
  .name('ignix-lite')
  .description('CLI tool for project initialization, component scaffolding, and local validation in Ignix-Lite')
  .version('1.0.0')

program
  .command('init')
  .description('Initialize Ignix-Lite in your project')
  .action(initCommand)

program
  .command('theme')
  .description('Generate a custom CSS theme palette')
  .option('-p, --primary <color>', 'Primary color (hex/hsl)')
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

program.parse(process.argv)
