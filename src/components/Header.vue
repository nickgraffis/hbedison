<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { isDark, toggleDark } from '~/logic'
const { t, availableLocales, locale } = useI18n()
const toolbar = ref(false)
const avatar = ref('/nick.png')
const avatars = [
  '/nick.png',
  '/045-dracula.svg',
  '/nick2.jpeg',
  '/nick3.jpeg',
  '/nick4.jpeg',
  '/nick5.jpeg',
  '/favicon.svg',
]
let index = 0
const dropAbout = ref(false)
const router = useRouter()
const to = (route: string) => {
  dropAbout.value = !dropAbout.value
  router.push(route)
}
const flipAvatar = () => {
  const avatarEl: HTMLElement | null = document.querySelector('#avatar') as HTMLElement
  if (avatarEl) {
    avatarEl.classList.add('rotate-360')
    avatarEl.style.filter = 'blur(10px)'
    setTimeout(() => {
      index = index < 6 ? index + 1 : 0
      avatar.value = avatars[index]
      avatarEl.classList.remove('rotate-360')
      avatarEl.style.filter = ''
    }, 500)
  }
}
</script>

<template>
  <nav
    style="-webkit-backdrop-filter: blur(5px); backdrop-filter: blur(5px);"
    class="sticky text-sm top-0 z-50 flex items-center justify-between w-full py-6 my-6 font-semibold text-nosferatu dark:text-cullen"
  >
    <div class="flex items-center justify-center h-full flex-shrink-0">
      <img
        id="avatar"
        alt="avatar"
        class="h-10 transform transition-all duration-150 w-10 cursor-pointer rounded-full object-cover mr-4 items-center ring-2 ring-offset-4 dark:ring-offset-nosferatu dark:ring-dracula ring-draculaDark"
        :src="avatar"
        @click="flipAvatar"
      />
    </div>
    <div class="flex w-full h-full space-x-4 flex-grow items-baseline justify-end">
      <NavLink to="/" class="hidden lg:inline-flex flex-grow text-lg">
        Nick Graffis
      </NavLink>
      <div class="relative hidden lg:inline-flex">
        <div class="group flex items-center space-x-2 cursor-pointer" @click="dropAbout = !dropAbout">
          <span class="transition-all duration-300 dark:group-hover:text-dracula group-hover:text-draculaDark">{{ t(`about`) }}</span>
          <akar-icons:chevron-right class="transition-all duration-300 h-4 w-4 transform dark:group-hover:text-dracula group-hover:text-draculaDark" :class="{ 'rotate-90': dropAbout }" />
        </div>
        <div
          class="rounded-md absolute top-8 right-0 transition-all duration-300 z-50 px-2 overflow-hidden transform origin-top-right"
          :class="[dropAbout ? 'scale-100 opacity-100' : 'scale-0 opacity-0']"
        >
          <ul class="space-y-2 text-left bg-cullen dark:bg-aro w-36 rounded-md p-1">
            <li class="flex space-x-2 items-center transition-colors duration-300 dark:hover:text-nosferatu hover:text-draculaDark rounded-md p-1 hover:dark:bg-dracula cursor-pointer" @click="to('/about')">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{{ t(`just-me`) }}</span>
            </li>
            <li class="flex space-x-2 items-center transition-colors duration-300 dark:hover:text-nosferatu hover:text-draculaDark rounded-md p-1 hover:dark:bg-dracula cursor-pointer" @click="to('/about/techstack')">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <span>{{ t(`tech-stack`) }}</span>
            </li>
            <li class="flex space-x-2 items-center transition-colors duration-300 dark:hover:text-nosferatu hover:text-draculaDark rounded-md p-1 hover:dark:bg-dracula cursor-pointer" @click="to('/about/uses')">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>{{ t(`uses`) }}</span>
            </li>
            <li class="flex space-x-2 items-center transition-colors duration-300 dark:hover:text-nosferatu hover:text-draculaDark rounded-md p-1 hover:dark:bg-dracula cursor-pointer" @click="to('/about/waterpolo')">
              <la-volleyball-ball />
              <span>{{ t(`water-polo`) }}</span>
            </li>
          </ul>
        </div>
      </div>
      <NavLink to="/" class="inline-flex lg:hidden">
        <bx-bx-home-heart />
      </NavLink>
      <NavLink to="/projects" class="hidden lg:inline-flex">
        {{ t(`projects`) }}
      </NavLink>
      <NavLink to="/projects" class="inline-flex lg:hidden">
        <entypo-lab-flask />
      </NavLink>
      <NavLink to="/blog" class="hidden lg:inline-flex">
        {{ t(`blog`) }}
      </NavLink>
      <NavLink to="/blog" class="inline-flex lg:hidden">
        <ant-design:message-outlined />
      </NavLink>
      <a href="http://resume.nickgraffis.me" class="hidden lg:inline-flex cursor-pointer dark:hover:text-dracula hover:text-draculaDark cursor-pointer">
        {{ t(`resume`) }}
      </a>
      <a href="http://resume.nickgraffis.me" class="inline-flex lg:hidden cursor-pointer dark:hover:text-dracula hover:text-draculaDark cursor-pointer">
        <akar-icons:paper />
      </a>
      <a class="icon-btn" :title="t('button.toggle_dark')" @click="toggleDark">
        <Vampire v-if="isDark" />
        <Sun v-else />
      </a>
    </div>
  </nav>
</template>
