<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { formatDate } from '../logic'
const lang = ref('en')
const router = useRouter()
const routes = router.getRoutes().filter((route: any) => route.meta.frontmatter?.date)
  .sort((a: any, b: any) => +new Date(b.meta.frontmatter.date) - +new Date(a.meta.frontmatter.date))
const posts: any = computed(() =>
  routes.filter((i: any) => !i.path.endsWith('.html') && i.meta.frontmatter?.lang === lang.value),
)
</script>

<template>
  <ul class="text-left w-full space-y-6 mt-2">
    <router-link
      v-for="route in posts"
      :key="route.path"
      class="item block"
      :to="route.path"
    >
      <li class="no-underline flex space-x-8">
        <Icon class="text-3xl opacity-75 flex-shrink-0" :icon="route.meta.frontmatter.icon || 'carbon:unknown'" />
        <div class="group">
          <div class="text-lg">
            {{ route.meta.frontmatter.title }}
          </div>
          <div class="mb-2 italic">
            {{ route.meta.frontmatter.description }}
          </div>
          <div
            class="text-gray-500 dark:text-gray-300 transition-all duration-200 dark:group-hover:text-dracula group-hover:text-draculaDark text-sm"
          >
            {{ formatDate(route.meta.frontmatter.date) }}
            <span v-if="route.meta.frontmatter.duration">·
              {{ route.meta.frontmatter.duration }}
            </span>
          </div>
        </div>
      </li>
    </router-link>
  </ul>
  <div v-if="!posts.length">
    <div class="w-full h-96 flex items-center justify-center flex-col">
      <img src="/empty.png" />
      <p class="text-lg font-black lg:text-3xl md:text-2xl text-center">
        No news posts yet!
      </p>
    </div>
  </div>
</template>
