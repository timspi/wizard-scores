<template>
  <div class="dark:bg-slate-900 dark:text-gray-100">
    <Main></Main>
  </div>
</template>

<script setup>
import { StatusBar } from '@capacitor/status-bar';
StatusBar.setBackgroundColor({ color: '#1e293b' });

useHead({
  title: 'Wizard Scorekeeper',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  charset: 'utf-8',
  meta: [
    { name: 'description', content: 'Digital scoresheet to keep track of scores of the card game Wizard.' }
  ],
  bodyAttrs: {
    class: 'dark bg-slate-900 text-gray-100 dark:bg-slate-900 dark:text-gray-100'
  }
})
</script>
