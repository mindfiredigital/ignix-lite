import pc from 'picocolors'

export interface SuggestedPatch {
  selector: string
  action: 'setAttribute' | 'removeAttribute' | 'replaceOuterHTML' | string
  attribute?: string
  value?: unknown
}

export function logSuggestedPatch(patch: SuggestedPatch) {
  const details = patch.attribute
    ? ` [${pc.yellow(patch.attribute)}=${pc.magenta(JSON.stringify(patch.value))}]`
    : patch.value !== undefined
      ? ` with value ${pc.magenta(JSON.stringify(patch.value))}`
      : ''
  console.log(
    `  ${pc.bold('Patch:')}   ${pc.cyan(patch.action)} on "${pc.blue(patch.selector)}"${details}`
  )
}
