import storybook from "eslint-plugin-storybook";
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import globals from 'globals'

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,

  
  {
    files: ['packages/**/*.js', 'tests/**/*.ts', 'storybook/**/*.ts'],
    languageOptions: {
      globals: {
        ...globals.browser
      }
    }
  },

  {
    files: ['scripts/**/*.js'],
    languageOptions: {
      globals: {
        require: 'readonly',
        console: 'readonly',
        process: 'readonly',
        __dirname: 'readonly'
      }
    }
  },

  {
    ignores: [
       '**/*.min.js',
      '**/*.min.css',
      '**/node_modules/**',
      '**/dist/**',
      '**/.husky/**'
    ]
  },

  ...storybook.configs["flat/recommended"]
];