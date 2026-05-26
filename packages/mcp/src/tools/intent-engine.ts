import { searchIndex } from './search-index.js'
import { getTokenCount } from '../utils/tokenizer.js'

export async function howToBuild(description: string) {
  const matches = searchIndex(description)
  if (matches.length === 0) {
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            emmet: '',
            html: '',
            components_used: [],
            confidence: 0,
            tokens: 0,
            tokens_used: 15
          })
        }
      ]
    }
  }

  const primary = matches[0]

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify({
          emmet: primary.emmet,
          html: primary.emmet,
          components_used: matches.map((x) => x.name),
          confidence: Number(primary.score.toFixed(2)),
          tokens: getTokenCount(primary.emmet),
          tokens_used: 15
        })
      }
    ]
  }
}
