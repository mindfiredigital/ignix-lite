import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
  entry: 'build.js',
  name: 'IgnixLite',
  formats: ['es'],
  fileName: () => 'ignix-lite.min.js' 
},

    cssCodeSplit: false,
    outDir: 'dist',
    emptyOutDir: true,
    minify: 'esbuild',

    rollupOptions: {
      output: {
        format: 'es', 
        assetFileNames: (assetInfo) => {
          if (assetInfo.names?.[0]?.endsWith('.css')) {
            return 'ignix-lite.min.css'
          }
          return assetInfo.names?.[0] || 'asset'
        }
      }
    }
  }
})
