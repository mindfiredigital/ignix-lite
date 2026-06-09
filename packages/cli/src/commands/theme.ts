import fs from 'fs'
import pc from 'picocolors'
import ora from 'ora'

function generateThemeVars(primaryHex: string): string {

    const hex = primaryHex.startsWith('#') ? primaryHex : `#${primaryHex}`

    return `/* Ignix-Lite Custom Theme Variables */

    :root {
        --ix-primary: ${hex};
        --ix-primary-hover: ${hex}d0;
        --ix-primary-contrast: #ffffff;
        --ix-primary-bg: ${hex}1a;
    }`
}

export async function themeCommand(options: { primary?: string }) {
    const primaryColor = options.primary
    if (!primaryColor) {
        console.log(pc.yellow('Please provide a primary color , e.g.: igix-lite theme -p #10b981'))
        return
    }

    const spinner = ora('Generating theme....').start()

    const configPath = 'ignix.config.json'
    if (!fs.existsSync(configPath)) {
        spinner.fail(pc.red('ignix.config.json not found. Run "ignix-lite init" first.'))
        return
    }

    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'))
    const stylePath = config.style
    if (!stylePath) {
        spinner.fail(pc.red('Style path no configured in ignix-config.json.'))
        return
    }

    const themeVars = generateThemeVars(primaryColor)
    if (fs.existsSync(stylePath)) {
        let content = fs.readFileSync(stylePath, 'utf-8')

        const themeRegex = /\/\* Ignix-Lite Custom Theme Variables \*\/[\s\S]*?\}\n/

        if (themeRegex.test(content)) {
            content = content.replace(themeRegex, themeVars)
        }
        else {
            content = themeVars + '\n' + content
        }
        fs.writeFileSync(stylePath, content)
    }
    else {
        fs.writeFileSync(stylePath, themeVars)
    }

    spinner.succeed(pc.green(`Theme successfully updated in ${pc.blue(stylePath)}`))

}
