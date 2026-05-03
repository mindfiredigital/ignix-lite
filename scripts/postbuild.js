import { existsSync, copyFileSync } from 'fs'
import { join } from 'path'

const distPath = join(process.cwd(), 'dist')

const cssSrc = join(distPath, 'ignix-lite.min.css')
const jsSrc = join(distPath, 'ignix-lite.min.js')

const cssDest = join(process.cwd(), 'ignix-lite.min.css')
const jsDest = join(process.cwd(), 'ignix-lite.min.js')

if (existsSync(cssSrc)) {
  copyFileSync(cssSrc, cssDest)
  console.log('CSS moved')
} else {
  console.error('CSS not found')
}

if (existsSync(jsSrc)) {
  copyFileSync(jsSrc, jsDest)
  console.log('JS moved')
} else {
  console.error('JS not found')
}

console.log('Postbuild done')
