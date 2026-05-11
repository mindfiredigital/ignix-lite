import type { StorybookConfig } from '@storybook/html-vite'

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.ts'],

  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y'
  ],

  framework: {
    name: '@storybook/html-vite',
    options: {}
  }
}

export default config


