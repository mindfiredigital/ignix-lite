import { readFileSync } from 'fs'
import { encoding_for_model } from 'tiktoken'
import path from 'path'

const encoder = encoding_for_model('gpt-4')

const files = ['../../api-full.txt']

for (const file of files) {
  const text = readFileSync(path.resolve(file), 'utf-8')

  console.log(file, '=', encoder.encode(text).length, 'tokens')
}
