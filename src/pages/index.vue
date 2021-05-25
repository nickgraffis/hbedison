<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
const router = useRouter()
const { t } = useI18n()
</script>
<template>
  <div class="h-full flex-grow">
    <div class="prose">
      <h1>
        {{ t (`Nick Graffis`) }}
      </h1>
      <div class="text-lg text-left">
        <p class="">
          {{ t(`opening`) }}
        </p>
        <p class="">
          {{ t(`opening-two`) }}
        </p>
        <p class="flex items-center space-x-4">
          <span class="bg-dracula flex items-center justify-center p-1 rounded-full flex-shrink-0 h-6 w-6">
            <fa-solid:exclamation class="w-4 h-4" />
          </span>
          <a class="cursor-pointer" @click="router.push(`/blog/personalsite`)">
            {{ t(`how-it-works`) }}
          </a>
        </p>
        <div class="dark:text-dracula text-draculaDark w-full cursor-pointer flex items-center justify-center space-x-2" @click="router.push(`/about`)">
          <span class="text-xs font-semibold tracking-wider uppercase">{{ t(`read-more`) }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-flex" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
    <div class=" space-y-4">
      <h1 class="text-lg text-left w-full text-nosferatu dark:text-cullen font-medium mb-4 mt-6">
        {{ t(`projects`) }}
      </h1>
      <Projects :length="4" />
      <div class="w-full cursor-pointer flex items-center justify-center space-x-2 text-dracula text-draculaDark" @click="router.push(`/projects`)">
        <span class="text-xs font-semibold tracking-wider uppercase">{{ t(`see-more-projects`) }}</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-dracula inline-flex" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>
    <div class=" space-y-4">
      <h1 class="text-lg text-left w-full text-nosferatu dark:text-cullen font-medium mb-4 mt-6">
        {{ t(`timeline`) }}
      </h1>
      <Timeline :length="4" />
      <div class="w-full cursor-pointer flex items-center justify-center space-x-2" @click="router.push(`/events`)">
        <span class="text-dracula text-xs font-semibold tracking-wider uppercase">{{ t(`see-full-timeline`) }}</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-dracula inline-flex" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>
  </div>
</template>
