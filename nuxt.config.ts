import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-12-26',
  ssr: false,
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
})