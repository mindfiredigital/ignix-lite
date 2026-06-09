import { readFileSync, existsSync } from 'fs'
import path from 'path'
import { parse } from 'node-html-parser'
import pc from 'picocolors'

export async function validateCommand(filePath: string) {
    const absolutePath = path.resolve(process.cwd(), filePath)

    if (!existsSync(absolutePath)) {
        console.log(pc.red(`Error: File not found at ${filePath}`))
        process.exit(1)
    }

    const html = readFileSync(absolutePath, 'utf8')
    const root = parse(html)
    const elements = root.querySelectorAll('*')
    const errors: string[] = []

    const allowedWrappers = [
        'label', 'span', 'p', 'img', 'small', 'h1', 'h2', 'h3', 'a', 'button',
        'ul', 'li', 'thead', 'tbody', 'tr', 'td', 'th', 'summary', 'details',
        'mark', 'hr', 'article', 'section', 'form', 'select', 'option',
        'textarea', 'input', 'meter', 'progress', 'table', 'nav', 'dialog'
    ]

    for (const el of elements) {
        const tag = el.tagName.toLowerCase()
        const attrs = el.attributes

        // Rule 1: No div tags allowed anywhere
        if (tag === 'div') {
            errors.push(`Line ${getLineNumber(html, el.range[0])}: <div ...> is forbidden! Use a semantic element like <section>, <article>, or <span>.`)
        }

        // Rule 2: No class attribute allowed
        if ('class' in attrs) {
            errors.push(`Line ${getLineNumber(html, el.range[0])}: <${tag}> contains "class" attribute. Ignix-Lite forbids class names.`)
        }

        // Rule 3: Max 4 attributes on a single element
        if (Object.keys(attrs).length > 4) {
            errors.push(`Line ${getLineNumber(html, el.range[0])}: <${tag}> has ${Object.keys(attrs).length} attributes. Max allowed is 4.`)
        }

        // Rule 4: No inline JS event handlers
        for (const attr of Object.keys(attrs)) {
            if (attr.startsWith('on')) {
                errors.push(`Line ${getLineNumber(html, el.range[0])}: <${tag}> contains JS handler "${attr}". Inline JS handlers are forbidden.`)
            }
        }

        // Rule 5: Allowed tag validation
        const isCustomTag = tag.startsWith('ix-')
        if (!allowedWrappers.includes(tag) && !isCustomTag) {
            errors.push(`Line ${getLineNumber(html, el.range[0])}: <${tag}> is not a valid Ignix-Lite element.`)
        }
    }

    const score = errors.length === 0 ? 100 : Math.max(0, 100 - errors.length * 10)

    console.log(pc.cyan(`\nValidation Report for: ${filePath}`))

    if (errors.length === 0) {
        console.log(pc.green(`All checks passed! Ignix-Lite Score: 100/100`))
    } else {
        console.log(pc.red(`Validation failed with ${errors.length} error(s)`))
        console.log(pc.red(`Ignix-Lite Score: ${score}/100\n`))
        errors.forEach((err) => console.log(pc.yellow(`- ${err}`)))
    }
    console.log()
}

function getLineNumber(html: string, index: number): number {
    return html.substring(0, index).split('\n').length
}
