<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { defineProps } from 'vue'
const props = defineProps({
  to: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: false,
  },
})
const { t, availableLocales, locale } = useI18n()
</script>
<template>
  <router-link :class="props.class" class="cursor-pointer dark:hover:text-dracula hover:text-draculaDark cursor-pointer" :to="props.to">
    <slot />
  </router-link>
</template>
