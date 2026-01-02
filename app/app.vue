<template>
  <div class="dark:bg-slate-900 dark:text-gray-100">
    <NuxtPwaManifest />
    <ClientOnly>
      <Main></Main>
    </ClientOnly>
  </div>
</template>

<script setup>
const conf = useRuntimeConfig();

useHead({
  title: 'Wizard Scores',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  charset: 'utf-8',
  meta: [
    { name: 'description', content: 'Simple scoresheet for the card game Wizard' },
    { name: 'theme-color', content: '#ffffff' },
  ],
  link: [
    { rel: 'icon', href: conf.app.baseURL + 'favicon.ico' },
    { rel: 'apple-touch-icon', href: conf.app.baseURL + 'apple-touch-icon.png' },
    { rel: 'mask-icon', href: conf.app.baseURL + 'favicon.svg' },
  ],
  htmlAttrs: {
    lang: 'en'
  },
  bodyAttrs: {
    class: 'dark bg-slate-900 text-gray-100 dark:bg-slate-900 dark:text-gray-100'
  }
})
</script>
