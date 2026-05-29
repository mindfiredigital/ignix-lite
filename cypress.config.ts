import { defineConfig } from 'cypress'

export default defineConfig({
  reporter: 'spec',

  e2e: {
    baseUrl: 'http://localhost:3000',
  },
})