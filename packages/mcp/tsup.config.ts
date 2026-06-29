import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/server.ts', 'src/utils/check-api.ts'],

  format: ['esm'],
  target: 'es2020',
  dts: true,
  clean: true,
  sourcemap: true,
  bundle: true,
  external: ['tiktoken'],
  banner: {
    js: '#!/usr/bin/env node'
  },
  tsconfig: 'tsconfig.build.json'
})
