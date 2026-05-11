import { existsSync, copyFileSync, readdirSync } from 'fs'
import { join } from 'path'

const distPath = join(process.cwd(), 'dist')

const files = readdirSync(distPath)

let cssFile = files.find(f => f.endsWith('.css'))
let jsFile = files.find(f => f.endsWith('.js'))

if (cssFile) {
  copyFileSync(
    join(distPath, cssFile),
    join(process.cwd(), 'ignix-lite.min.css')
  )
  console.log('CSS moved')
} else {
  console.error('CSS not found')
}

if (jsFile) {
  copyFileSync(
    join(distPath, jsFile),
    join(process.cwd(), 'ignix-lite.min.js')
  )
  console.log('JS moved')
} else {
  console.error('JS not found')
}

console.log('Postbuild done')