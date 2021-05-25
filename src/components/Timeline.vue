<script setup lang="ts">
import { useRouter } from 'vue-router'
import { defineProps } from 'vue'
import { formatDate } from '../logic'
const props = defineProps({
  length: {
    type: Number,
    required: false,
  },
})
const router = useRouter()
const events: any = router.getRoutes().filter((route: any) => route.meta.frontmatter?.color)
  .sort((a: any, b: any) => +new Date(b.meta.frontmatter.date) - +new Date(a.meta.frontmatter.date))
  .splice(0, props.length || router.getRoutes().filter((route: any) => route.meta.frontmatter?.color).length)
</script>
<template>
  <div class="w-full space-y-12 timeline">
    <div v-for="(event, index) in events" :key="event.meta.frontmatter.date" class="relative">
      <div
        style="z-index: 1;"
        class="absolute timeline-stick w-0.5 dark:bg-cullen bg-nosferatu rounded-sm mt-1 left-4 -ml-px h-24"
        :class="[index === events.length - 1 ? 'hidden': '']"
      />
      <div style="z-index: 1;" class="flex w-full items-center relative space-x-4 lg:text-sm text-xs timeline-event">
        <div :class="event.meta.frontmatter.color" class="text-cullen dark:text-aro rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
          <Icon :icon="event.meta.frontmatter.icon" />
        </div>
        <p class="flex-grow mx-4 text-nosferatu dark:text-cullen">
          {{ event.meta.frontmatter.description }}
        </p>
        <p class="text-nosferatu dark:text-cullen">
          {{ formatDate(event.meta.frontmatter.date) }}
        </p>
      </div>
    </div>
  </div>
</template>
