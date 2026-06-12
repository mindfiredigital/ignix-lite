import { parse } from 'node-html-parser'
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

const RULE_CONFIDENCES: Record<string, { error: number; warning: number }> = {
    'WCAG 1.1.1 Non-text Content': { error: 0.99, warning: 0.80 },
    'WCAG 1.3.1 Form Labels': { error: 0.98, warning: 0.78 },
    'WCAG 2.4.6 Empty Labels': { error: 0.95, warning: 0.75 },
    'WCAG 4.1.2 Button Names': { error: 0.99, warning: 0.80 },
    'WCAG 2.4.4 Link Purpose': { error: 0.97, warning: 0.75 },
    'WCAG 3.3.1 Error Identification': { error: 0.98, warning: 0.75 },
    'WCAG 4.1.2 ARIA State Values': { error: 0.96, warning: 0.75 },
    'WCAG 4.1.1 Parsing': { error: 0.99, warning: 0.80 },
    'WCAG 2.1.1 Keyboard': { error: 0.95, warning: 0.75 },
    'WCAG 2.4.6 Heading Hierarchy': { error: 0.95, warning: 0.75 },
    'WCAG 1.3.1 Table Structure': { error: 0.97, warning: 0.75 },
    'WCAG 4.1.2 Dialog Accessibility': { error: 0.98, warning: 0.75 },
    'WCAG 4.1.2 ARIA Role Requirements': { error: 0.98, warning: 0.75 },
    'WCAG 1.3.5 Input Purpose': { error: 0.95, warning: 0.75 },
    'WCAG 2.4.7 Focus Visible': { error: 0.95, warning: 0.75 },
    'WCAG 3.1.1 Language of Page': { error: 0.99, warning: 0.80 }
}

function getConfidenceForRule(
    ruleName: string,
    type: 'error' | 'warning'
): number {
    const conf = RULE_CONFIDENCES[ruleName]
    if (conf) {
        return type === 'error' ? conf.error : conf.warning
    }
    return type === 'error' ? 0.98 : 0.75
}

function computeScore(issues: A11yIssue[]): number {
    const errors = issues.filter((i) => i.type === 'error').length
    const warnings = issues.filter((i) => i.type === 'warning').length
    return Math.max(0, 100 - errors * 10 - warnings * 3)
}

function getPassingRules(results: RuleResult[]): string[] {
    return results.filter((r) => r.issues.length === 0).map((r) => r.ruleName)
}

export function auditA11y(html: string): { score: number; passes: string[]; issues: A11yIssue[]; wcag: string } {
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
        confidence: getConfidenceForRule(i.rule, i.type)
    }))
    const passes = getPassingRules(results)
    const score = computeScore(issues)

    return {
        score,
        passes,
        issues,
        wcag: 'AA'
    }
}
