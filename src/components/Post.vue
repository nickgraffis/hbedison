<script setup lang='ts'>
import { defineProps, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useEventListener, isClient } from '@vueuse/core'
import twemoji from 'twemoji'
import { formatDate } from '../logic'
const route = useRoute()
const { frontmatter } = defineProps<{ frontmatter: any }>()

if (isClient) {
  const navigate = () => {
    if (location.hash) {
      document.querySelector(location.hash)
        ?.scrollIntoView({ behavior: 'smooth' })
    }
  }
  useEventListener(window, 'hashchange', navigate, false)
  onMounted(() => {
    twemoji.parse(document.body)
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault()
        const href = anchor.getAttribute('href') as string
        history.replaceState({}, '', href)
        navigate()
      })
    })
    navigate()
    setTimeout(navigate, 500)
  })
}
</script>
<template>
  <div v-if="frontmatter.title && frontmatter.title !== 'Blog' && frontmatter.title !== '<3'" class="prose text-left w-full mb-6">
    <h1>
      {{ frontmatter.title }}
    </h1>
    <p v-if="frontmatter.date" class="text-gray-500 dark:text-gray-300">
      {{ formatDate(frontmatter.date) }} <span v-if="frontmatter.duration">· {{ frontmatter.duration }}</span>
    </p>
    <p v-if="frontmatter.description" class="text-gray-500 dark:text-gray-300 italic">
      {{ frontmatter.description }}
    </p>
  </div>
  <slot />
  <div v-if="route.path !== '/'" class="w-full my-8 text-left">
    <router-link
      :to="route.path.split('/').slice(0, -1).join('/') || '/'"
      class="flex space-x-4 items-center text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-200"
    >
      <eva-arrow-back-outline />
      <span>Back</span>
    </router-link>
  </div>
</template>
