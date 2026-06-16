import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        review: path.resolve(__dirname, 'review.html'),
      },
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-radix': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-label',
            '@radix-ui/react-select',
            '@radix-ui/react-slot',
            '@radix-ui/react-tooltip',
          ],
          'vendor-form': ['react-hook-form', '@hookform/resolvers', 'zod'],
          'vendor-ui': ['lucide-react', 'class-variance-authority', 'clsx', 'tailwind-merge', 'sonner'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
});
