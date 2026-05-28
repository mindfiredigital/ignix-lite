export type IssueType = 'error' | 'warning'

export interface A11yIssue {
  type: IssueType
  rule: string
  element: string
  message: string
  fix: string
  confidence?: number
}

export interface RuleResult {
  ruleName: string
  issues: A11yIssue[]
}
