import { themes as prismThemes } from 'prism-react-renderer'
import type { Config } from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'

const config: Config = {
  title: 'Ignix Lite',
  tagline: 'Minimal CSS-first UI system',
  favicon: 'img/logo.png',


  url: 'https://mindfiredigital.github.io',
  baseUrl: '/ignix-lite/',


  organizationName: 'mindfiredigital',
  projectName: 'ignix-lite',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: ['docusaurus-plugin-sass'],

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: undefined,
        },
        blog: false,
        theme: {
          customCss: [
            require.resolve('./src/css/framework.scss'),
            require.resolve('./src/css/custom.css'),
            require.resolve('./src/css/homepage.scss'),

          ]
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/logo.png',

    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },

    navbar: {
      title: 'Ignix Lite',
      logo: {
        alt: 'Ignix Lite Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/mindfiredigital/ignix-lite',
          className: 'header--github-link',
          'aria-label': 'GitHub repository',
          position: 'right',
        },
      ],
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
  scripts: [
    {
      src: '/ignix-lite/ignix-lite.min.js',
      defer: true,
    },
  ],
}

export default config