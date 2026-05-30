import { readFileSync, existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Dynamically handle both bundled dist/ and source src/context/ contexts
let apiPath = path.resolve(__dirname, '../../../api-full.txt')
if (!existsSync(apiPath)) {
  apiPath = path.resolve(__dirname, '../../../../api-full.txt')
}

export const apiContext = readFileSync(apiPath, 'utf8')
