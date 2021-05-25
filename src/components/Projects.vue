<script setup lang="ts">
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
const props = defineProps({
  length: {
    type: Number,
    required: false,
  },
})
const router = useRouter()
const projects: any = router.getRoutes().filter((route: any) => route.meta.frontmatter?.tech)
  .sort((a: any, b: any) => a.meta.frontmatter.order - b.meta.frontmatter.order)
  .splice(0, props.length || router.getRoutes().filter((route: any) => route.meta.frontmatter?.tech).length)
</script>
<template>
  <div class="grid grid-cols-4 gap-4">
    <div
      v-for="project in projects"
      :key="project.meta.frontmatter.order"
      :class="project.meta.frontmatter.size"
      class="group col-span-4 cursor-pointer rounded-md dark:border-cullen border-nosferatu border-2 flex-col flex space-y-4 items-center justify-center p-4"
    >
      <Clown v-if="project.meta.frontmatter.icon === 'Clown'" />
      <DB v-else-if="project.meta.frontmatter.icon === 'DB'" />
      <VampireHover v-else-if="project.meta.frontmatter.icon === 'VampireHover'" />
      <Hadena v-else />
      <div>
        <p class="font-semibold text-center">
          {{ project.meta.frontmatter.title }}
        </p>
        <p class="text-sm pb-2 text-center">
          {{ project.meta.frontmatter.description }}
        </p>
        <div class="flex space-x-2 items-center justify-center">
          <Icon
            v-for="(tech, index) in project.meta.frontmatter.tech"
            :key="index"
            class="h-4 w-4 text-nosferatu dark:text-cullen"
            :class="'group-hover:text-' + tech.color"
            :icon="tech.icon"
          />
          <div class="flex items-center justify-end">
            <a
              rel="noopener noreferrer"
              target="_blank"
              class="icon-btn animate hover:animate-spin"
              :href="project.meta.frontmatter.link"
            >
              <bi-globe />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
