/* eslint-disable no-undef */
import { execSync } from 'child_process'
import fs from 'fs'

// Prevent duplicate changesets
if (fs.existsSync('.changeset')) {

  const existing = fs
    .readdirSync('.changeset')
    .filter(file => file.endsWith('.md'))

  if (existing.length > 0) {

    console.log(
      ' Changeset already exists, skipping generation'
    )

    process.exit(0)
  }
}

// Latest commit message
const commitMessage = execSync(
  'git log -1 --format=%s'
).toString().trim()

console.log(
  ` Processing commit: "${commitMessage}"`
)

// Commit patterns
const commitPatterns = {
  minor: /^feat\(core\)!?: (.+)/,
  patch: /^fix\(core\)!?: (.+)/
}

// Breaking change
const isBreaking =
  /!:/.test(commitMessage) ||
  commitMessage.includes('BREAKING CHANGE')

let changeType = null
let description = null

// MAJOR
if (isBreaking) {

  const match =
    commitMessage.match(
      /^feat\(core\)!?: (.+)/
    ) ||
    commitMessage.match(
      /^fix\(core\)!?: (.+)/
    )

  if (match) {

    changeType = 'major'
    description = match[1]
  }
}

// MINOR
else if (
  commitPatterns.minor.test(commitMessage)
) {

  const match =
    commitMessage.match(commitPatterns.minor)

  changeType = 'minor'
  description = match[1]
}

// PATCH
else if (
  commitPatterns.patch.test(commitMessage)
) {

  const match =
    commitMessage.match(commitPatterns.patch)

  changeType = 'patch'
  description = match[1]
}

// Generate changeset
if (changeType) {

  const changesetContent = `---
'@mindfiredigital/ignix-lite': ${changeType}
---

${description}
`

  fs.writeFileSync(
    `.changeset/auto-${Date.now()}.md`,
    changesetContent
  )

  console.log(
    ` Changeset created (${changeType})`
  )

} else {

  console.log(
    'No valid release commit found'
  )
}