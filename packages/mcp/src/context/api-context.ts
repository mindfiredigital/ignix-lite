import { readFileSync } from 'fs'
import path from 'path'

export const apiContext = readFileSync(
  path.resolve(process.cwd(), '../../api-full.txt'),

  'utf8'
)
