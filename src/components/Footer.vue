<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t, availableLocales, locale } = useI18n()
const toggleLocales = (event: Event) => {
  const target = event.target as HTMLSelectElement
  locale.value = target.value
}
</script>

<template>
  <footer class="py-12 overflow-hidden max-w-7xl sm:px-6 lg:px-">
    <nav
      class="text-gray-500 dark:text-gray-300 flex flex-wrap items-baseline justify-center text-sm lg:text-base space-x-8 space-y-2 lg:space-y-0"
      aria-label="Footer"
    >
      <router-link class="hover:text-gray-900 dark:hover:text-gray-200 " to="/about">
        {{ t(`about`) }}
      </router-link>
      <router-link class="hover:text-gray-900 dark:hover:text-gray-200 " to="/projects">
        {{ t(`projects`) }}
      </router-link>
      <router-link class="hover:text-gray-900 dark:hover:text-gray-200 " to="/blog">
        {{ t(`blog`) }}
      </router-link>
      <router-link class="hover:text-gray-900 dark:hover:text-gray-200 " to="/resume">
        {{ t(`resume`) }}
      </router-link>
      <router-link class="hover:text-gray-900 dark:hover:text-gray-200 " to="/events">
        {{ t(`timeline`) }}
      </router-link>
    </nav>
    <nav class="flex justify-center items-center mt-8 space-x-6 text-gray-500 dark:text-gray-300">
      <a href="https://dribbble.com/nickgraffis" class="hover:text-gray-900 dark:hover:text-gray-200" target="_blank" rel="noopener noreferrer">
        <span class="sr-only">Dribbble</span>
        <akar-icons:dribbble-fill class="h-5 w-5 lg:h-6 lg:w-6" />
      </a>
      <a href="https://www.instagram.com/nicholasgraffis/" class="hover:text-gray-900 dark:hover:text-gray-200" target="_blank" rel="noopener noreferrer">
        <span class="sr-only">Instagram</span>
        <akar-icons:instagram-fill class="h-5 w-5 lg:h-6 lg:w-6" />
      </a>
      <a href="https://codepen.io/nickgraffis" class="hover:text-gray-900 dark:hover:text-gray-200" target="_blank" rel="noopener noreferrer">
        <span class="sr-only">CodePen</span>
        <akar-icons:codepen-fill class="h-5 w-5 lg:h-6 lg:w-6" />
      </a>
      <a href="https://linkedin.com/in/nickgraffis" class="hover:text-gray-900 dark:hover:text-gray-200" target="_blank" rel="noopener noreferrer">
        <span class="sr-only">Linkedin</span>
        <eva-linkedin-outline class="h-6 w-6 lg:h-7 lg:w-7" />
      </a>
      <a href="https://github.com/nickgraffis" class="hover:text-gray-900 dark:hover:text-gray-200" target="_blank" rel="noopener noreferrer">
        <span class="sr-only">GitHub</span>
        <eva-github-outline class="h-6 w-6 lg:h-7 lg:w-7" />
      </a>
      <a href="https://twitter.com/nickgraffistwit" class="hover:text-gray-900 dark:hover:text-gray-200" target="_blank" rel="noopener noreferrer">
        <span class="sr-only">Twitter</span>
        <eva-twitter-outline class="h-6 w-6 lg:h-7 lg:w-7" />
      </a>
    </nav>
    <p class="w-full justify-center text-center mt-8 flex-shrink-0 flex items-center space-x-2 text-xs lg:text-base text-center text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-200">
      <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-NC-SA 4.0 2021 &copy; Nick Graffis.</a>
    </p>
    <div class="flex flex-col items-center justify-center max-w-3xl pt-8 mx-auto lg:space-x-6 space-y-6 lg:flex-row lg:space-y-0">
      <router-link
        aria-label="Love"
        class="flex items-center justify-center rounded-full text-gray-500 dark:text-gray-300 hover:text-buffyDark dark:hover:text-buffy"
        to="/love"
      >
        <ant-design:heart-filled class="h-5 w-5 lg:h-6 lg:w-6" />
      </router-link>
      <div class="flex space-x-4 flex-grow items-center">
        <div class="dark:bg-morbius bg-morbiusDark h-4 w-4 rounded-full"></div>
        <div class="dark:bg-vonCount bg-vonCountDark h-4 w-4 rounded-full"></div>
        <div class="dark:bg-blade bg-bladeDark h-4 w-4 rounded-full"></div>
        <div class="dark:bg-buffy bg-buffyDark h-4 w-4 rounded-full"></div>
        <div class="dark:bg-dracula bg-draculaDark h-4 w-4 rounded-full"></div>
        <div class="dark:bg-marcilin bg-marcilin h-4 w-4 rounded-full"></div>
        <div class="dark:bg-vanHelsing bg-vanHelsingDark h-4 w-4 rounded-full"></div>
        <div class="dark:bg-lincoln bg-lincolnDark h-4 w-4 rounded-full"></div>
      </div>
      <div class="flex-grow-0">
        <form>
          <fieldset class="w-full">
            <label for="mode" class="sr-only">Mode</label>
            <div class="relative">
              <select
                id="mode"
                class="cursor-pointer block w-full py-2 pl-3 pr-10 lg:text-base text-nosferatu dark:text-cullen dark:border-cullen dark:bg-nosferatu border-[1px] border-nosferatu bg-cullen appearance-none rounded-md bg-none focus:outline-none text-sm"
                @change="toggleLocales($event)"
              >
                <option value="en">
                  English
                </option>
                <option value="fr">
                  Français
                </option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center px-2 text-nosferatu dark:text-cullen pointer-events-none">
                <akar-icons:chevron-down class="w-3 h-3 lg:w-4 lg:h-4" />
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  </footer>
</template>
