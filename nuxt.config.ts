import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    ssr: false,
    typescript: {
        shim: false
    },
    modules: [
        '@nuxtjs/pwa',
        '@nuxtjs/tailwindcss',
        // '@nuxtjs/color-mode'
    ],
    // colorMode: {
    //     preference: 'system', // default value of $colorMode.preference
    //     fallback: 'dark', // fallback value if not system preference found
    //     classSuffix: ''
    // },
})
