import { parse } from 'node-html-parser'
import type { MCPResponse } from '../types.js'
import type { A11yIssue, RuleResult } from '../utils/a11y-types.js'
import {
  checkImages,
  checkFormLabels,
  checkEmptyLabels,
  checkButtons,
  checkLinks,
  checkAriaStates,
  checkDuplicateIds,
  checkTabIndex,
  checkHeadings,
  checkTables,
  checkDialogs,
  checkRoles,
  checkAutocomplete,
  checkFocusStyle,
  checkLang
} from '../utils/a11y-rules.js'

function computeScore(issues: A11yIssue[]): number {
  const errors = issues.filter((i) => i.type === 'error').length
  const warnings = issues.filter((i) => i.type === 'warning').length
  return Math.max(0, 100 - errors * 10 - warnings * 3)
}

function getPassingRules(results: RuleResult[]): string[] {
  return results.filter((r) => r.issues.length === 0).map((r) => r.ruleName)
}

export function checkA11y(html: string): MCPResponse {
  const root = parse(html)

  const results: RuleResult[] = [
    checkImages(root),
    checkFormLabels(root),
    checkEmptyLabels(root),
    checkButtons(root),
    checkLinks(root),
    checkAriaStates(root),
    checkDuplicateIds(root),
    checkTabIndex(root),
    checkHeadings(root),
    checkTables(root),
    checkDialogs(root),
    checkRoles(root),
    checkAutocomplete(root),
    checkFocusStyle(root),
    checkLang(root)
  ]

  const rawIssues = results.flatMap((r) => r.issues)
  const issues: A11yIssue[] = rawIssues.map((i) => ({
    ...i,
    confidence: i.type === 'error' ? 0.98 : 0.75
  }))
  const passes = getPassingRules(results)
  const score = computeScore(issues)

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify({
          score,
          passes,
          issues,
          wcag: 'AA',
          tokens_used: Math.min(60, 20 + issues.length * 3)
        })
      }
    ]
  }
}
