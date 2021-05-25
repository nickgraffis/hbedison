<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t, availableLocales, locale } = useI18n()
const toggleLocales = (event: Event) => {
  const target = event.target as HTMLSelectElement
  locale.value = target.value
}
</script>

<template>
  <footer class="py-12 overflow-hidden max-w-7xl">
    <nav
      class="text-gray-800 font-semibold flex flex-wrap items-baseline justify-center text-sm lg:text-base space-x-0 lg:space-x-8 space-y-2 lg:space-y-0"
      aria-label="Footer"
    >
      <router-link to="/summer" class="cursor-pointer hover:text-green-800 hover:bg-yellow-300 p-2 rounded-md">
        Summer
      </router-link>
      <router-link to="/staff" class="cursor-pointer hover:text-green-800 hover:bg-yellow-300 p-2 rounded-md">
        Coaching Staff
      </router-link>
      <router-link to="/about" class="cursor-pointer hover:text-green-800 hover:bg-yellow-300 p-2 rounded-md">
        About Edison
      </router-link>
      <router-link to="/news" class="cursor-pointer hover:text-green-800 hover:bg-yellow-300 p-2 rounded-md">
        News
      </router-link>
    </nav>
  </footer>
</template>
