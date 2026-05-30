export const STOP_WORDS = new Set([
  'with',
  'for',
  'and',
  'the',
  'you',
  'can',
  'from',
  'this',
  'that',
  'your',
  'want',
  'need',
  'show',
  'give',
  'nice',
  'page',
  'here',
  'please',
  'make',
  'create',
  'build',
  'about',
  'using',
  'what',
  'should',
  'how'
])

export function tokenise(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s/]/g, ' ')
    .split(/[\s/]+/)
    .filter((w) => w.length > 1 && !STOP_WORDS.has(w))
}

export function editDistance(s1: string, s2: string): number {
  const costs: number[] = []
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i
    for (let j = 0; j <= s2.length; j++) {
      if (i === 0) {
        costs[j] = j
      } else {
        if (j > 0) {
          let newValue = costs[j - 1]
          if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1
          }
          costs[j - 1] = lastValue
          lastValue = newValue
        }
      }
    }
    if (i > 0) costs[s2.length] = lastValue
  }
  return costs[s2.length]
}

export function isSimilar(w1: string, w2: string): boolean {
  if (w1.length < 3 || w2.length < 3) return w1 === w2
  // Typo tolerance: 1 edit for 3-5 chars, 2 edits for 6+ chars
  const maxDistance = w1.length >= 6 && w2.length >= 6 ? 2 : 1
  return editDistance(w1, w2) <= maxDistance
}
