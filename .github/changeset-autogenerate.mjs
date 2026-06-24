/* eslint-disable no-undef */
import { execSync } from 'child_process'
import fs from 'fs'

// Prevent duplicate changesets
if (fs.existsSync('.changeset')) {

  const existing = fs
    .readdirSync('.changeset')
    .filter(f => f.endsWith('.md'))

  if (existing.length > 0) {

    console.log(
      'Changeset already exists, skipping generation'
    )

    process.exit(0)
  }
}

// Get latest commit message
const commitMessage = execSync(
  'git log -1 --format=%s'
).toString().trim()

console.log(
  `Processing commit message: "${commitMessage}"`
)

// Valid scopes for release
const validScopes = ['core', 'mcp', 'engine', 'cli', 'skill']

// Regex patterns (with ! support)
const commitPatterns = {
  minor: /^feat\(([^)]+)\)!?: (.+)/,
  patch: /^fix\(([^)]+)\)!?: (.+)/,
}

// Detect breaking change
const isBreaking =
  /!:/.test(commitMessage) ||
  commitMessage.includes('BREAKING CHANGE')

// Identify type, package, and description
let matchedScopesStr = null
let changeType = null
let description = null

// MAJOR
if (isBreaking) {

  const match =
    commitMessage.match(
      /^feat\(([^)]+)\)!?: (.+)/
    ) ||
    commitMessage.match(
      /^fix\(([^)]+)\)!?: (.+)/
    )

  if (match) {
    matchedScopesStr = match[1]
    changeType = 'major'
    description = match[2]
  }
}

// MINOR
else if (
  commitPatterns.minor.test(commitMessage)
) {

  const match =
    commitMessage.match(commitPatterns.minor)

  matchedScopesStr = match[1]
  changeType = 'minor'
  description = match[2]
}

// PATCH
else if (
  commitPatterns.patch.test(commitMessage)
) {

  const match =
    commitMessage.match(commitPatterns.patch)

  matchedScopesStr = match[1]
  changeType = 'patch'
  description = match[2]
}

// Generate changeset
if (matchedScopesStr) {

  const rawScopes = matchedScopesStr.split(',').map(s => s.trim())
  const scopes = rawScopes.filter(s => validScopes.includes(s))

  if (scopes.length === 0) {
    console.log('No valid scopes matched')
    process.exit(0)
  }

  description =
    description?.trim() || 'No description provided.'

  // Scope -> npm package mapping
  const scopeToPackage = {
    core: '@mindfiredigital/ignix-lite',
    mcp: '@mindfiredigital/ignix-lite-mcp',
    engine: '@mindfiredigital/ignix-lite-engine',
    cli: '@mindfiredigital/ignix-lite-cli',
    skill: '@mindfiredigital/ignix-lite-skill',
  }

  const frontmatter = scopes
    .map(scope => `'${scopeToPackage[scope]}': ${changeType}`)
    .join('\n')

  const changesetContent = `---
${frontmatter}
---
${description}
`

  fs.writeFileSync(
    `.changeset/auto-${Date.now()}.md`,
    changesetContent
  )

  console.log(
    `Changeset created for: ${scopes.join(', ')} (${changeType})`
  )

} else {

  console.log(
    'No valid commit found. Use: feat(scope), fix(scope), or ! for breaking'
  )
}