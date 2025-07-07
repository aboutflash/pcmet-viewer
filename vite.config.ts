import { rmSync } from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  rmSync('dist', { recursive: true, force: true })

  return {
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src')
      },
    },
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        devOptions: { enabled: true },
        // generates 'manifest.webmanifest' file on build
        manifest: {
          name: 'A friendly user interface for pc_met service',
          short_name: 'PC_MET Viewer',
          description: 'This service provides a wrapper for the pc_met service simply to improve usability and slightly enhance functionality',
          scope: '/',
          start_url: '/',
          background_color: '#ffffff',
          theme_color: '#000000',
          icons: [
            {
              src: '/images/icon-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: '/images/icon-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        },
        // add this to cache all the
        // static assets in the public folder
        includeAssets: [
          '**/*',
        ],
        workbox: {
          // defining cached files formats
          globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest}'],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/api\.example\.com\/.*/i,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'api-cache'
              }
            }
          ]
        },
      })
    ],
    clearScreen: false,
    test: {
      globals: true,
      environment: 'jest-dom',
      setupFiles: '.vitest/setup',
      include: ['**/test.{ts,tsx}']
    }
  }
})
