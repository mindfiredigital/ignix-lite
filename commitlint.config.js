export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'chore', 'refactor', 'test'],
    ],
    'scope-enum': [
      2,
      'always',
      [
        'core',
        'mcp',
        'docs',
        'release',
        'deps',
        'test',
        'stories',
        'cli',
        'engine',
        'a2ui-demo',
        'skill',
      ],
    ],
    'scope-empty': [2, 'never'],
    'subject-case': [2, 'never', ['upper-case']],
    'header-max-length': [2, 'always', 72],
  },
}