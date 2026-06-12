import { encoding_for_model } from 'tiktoken'

const encoder = encoding_for_model('gpt-4')

export function getTokenCount(input: string): number {
  return encoder.encode(input).length
}
