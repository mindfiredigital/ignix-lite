const VOCAB_SIZE = 512

export function embedText(text: string): number[] {
  const vector = new Array(VOCAB_SIZE).fill(0)
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
  words.forEach((word) => {
    let hash = 0
    for (let i = 0; i < word.length; i++) {
      hash = (hash * 31 + word.charCodeAt(i)) % VOCAB_SIZE
    }
    vector[hash] += 1
  })
  return vector
}
