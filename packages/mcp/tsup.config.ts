import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/server.ts'],
  format: ['esm'],
  target: 'es2020',
  dts: true,
  clean: true,
  sourcemap: true,
  bundle: true,
  external: ['tiktoken']
})
