import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-12-26',
  ssr: true,
  devtools: { enabled: true },
  css: ['./app/main.css'],
  app: {
    baseURL: '/wizard-scores/',
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  modules: ['@vite-pwa/nuxt'],
  pwa: {
    strategies: 'generateSW',
    registerType: 'autoUpdate',
    includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'favicon.svg'],
    manifest: {
      name: 'Wizard Scores',
      short_name: 'Wizard',
      description: 'Simple scoresheet for the card game Wizard',
      theme_color: '#ffffff',
      background_color: '#0f172b',
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any'
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        }
      ],
      screenshots: [
        {
          src: 'screenshots/screenshot1.png',
          sizes: '1080x2290',
          form_factor: 'narrow',
          label: 'Player configuration'
        },
        {
          src: 'screenshots/screenshot2.png',
          sizes: '1080x2290',
          form_factor: 'narrow',
          label: 'Bids input'
        },
        {
          src: 'screenshots/screenshot3.png',
          sizes: '1080x2290',
          form_factor: 'narrow',
          label: 'Ranking and scoresheet'
        },
      ],
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    devOptions: {
      enabled: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module',
    }
  }
})
