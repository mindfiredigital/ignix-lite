import fs from 'fs'
import path from 'path'
import prompts from 'prompts'
import pc from 'picocolors'
import ora from 'ora'

export async function initCommand() {
  console.log(
    pc.cyan("Welcome to Ignix-Lite! Let's get your project set up.\n")
  )

  const response = await prompts([
    {
      type: 'select',
      name: 'framework',
      message: 'Which framework are you using?',
      choices: [
        { title: 'React', value: 'react' },
        { title: 'Vue', value: 'vue' },
        { title: 'Svelte', value: 'svelte' },
        { title: 'Vanilla HTML', value: 'vanilla' }
      ]
    },
    {
      type: 'text',
      name: 'stylePath',
      message:
        'Path to your main CSS file (where Ignix-Lite variables will be added):',
      initial: 'src/index.css'
    },
    {
      type: 'text',
      name: 'primaryColor',
      message: 'Default primary theme color (hex):',
      initial: '#6366f1',
      validate: (value: string) => {
        const hexRegex = /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/
        return hexRegex.test(value)
          ? true
          : 'Please enter a valid hex color code (e.g. #6366f1 or #fff)'
      }
    }
  ])

  if (!response.framework || !response.stylePath) {
    console.log(pc.red('\nSetup cancelled.'))
    return
  }

  const spinner = ora('Initializing project...').start()

  // 1. Create ignix.config.json
  const config = {
    framework: response.framework,
    style: response.stylePath,
    theme: {
      primary: response.primaryColor
    }
  }

  fs.writeFileSync('ignix.config.json', JSON.stringify(config, null, 2))

  // 2. Ensure CSS file exists and add initial theme block
  const cssDir = path.dirname(response.stylePath)
  if (!fs.existsSync(cssDir)) {
    fs.mkdirSync(cssDir, { recursive: true })
  }

  const defaultThemeVars = `/* Ignix-Lite Custom Theme Variables */
:root {
  --ix-primary: ${response.primaryColor};
  --ix-primary-hover: ${response.primaryColor}d0;
  --ix-primary-contrast: #ffffff;
  --ix-primary-bg: ${response.primaryColor}1a;
}
`

  if (fs.existsSync(response.stylePath)) {
    let content = fs.readFileSync(response.stylePath, 'utf-8')
    if (!content.includes('--ix-primary')) {
      content = defaultThemeVars + '\n' + content
      fs.writeFileSync(response.stylePath, content)
    }
  } else {
    fs.writeFileSync(response.stylePath, defaultThemeVars)
  }

  spinner.succeed(pc.green('Ignix-Lite initialized successfully!'))
  console.log(`\nCreated ${pc.blue('ignix.config.json')}`)
  console.log(`Updated theme variables in ${pc.blue(response.stylePath)}`)
}
