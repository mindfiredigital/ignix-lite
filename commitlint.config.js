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
        'react',
        'vue',
        'svelte',
        'mcp',
        'docs',
        'release',
        'deps',
        'test',
        'stories',
        'cli',
        'engine'
      ],
    ],
    'scope-empty': [2, 'never'],
    'subject-case': [2, 'never', ['upper-case']],
    'header-max-length': [2, 'always', 72],
  },
}