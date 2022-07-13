<script setup lang="ts">
import { useHead } from '@vueuse/head'
import 'bottom-sheet-vue3/css/style.css'
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'Nick Graffis',
  meta: [
    { name: 'description', content: 'Nick Graffis\'s Personal Website' },
  ],
})
</script>

<template>
  <router-view />
</template>
