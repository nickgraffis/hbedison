<script setup lang="ts">
</script>

<template>
  <nav
    class="text-base top-0 z-50 flex items-end justify-between w-full py-6 my-6 font-semibold text-gray-800"
  >
    <div class="flex-shrink-0">
      <router-link to="/">
        <img src="/logo.png" class="w-36 cursor-pointer hidden lg:inline-flex">
        <img src="/logo-sm.png" class="w-12 cursor-pointer inline-flex lg:hidden">
      </router-link>
    </div>
    <div class="flex items-center justify-center h-full flex-shrink-0 space-x-2 lg:space-x-4">
      <router-link to="/summer" class="cursor-pointer hover:text-green-800 hover:bg-yellow-300 p-2 rounded-md hidden lg:inline-flex">
        Summer
      </router-link>
      <router-link to="/summer" class="cursor-pointer text-green-800 bg-yellow-300 p-2 rounded-md inline-flex lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
        </svg>
      </router-link>
      <router-link to="/staff" class="cursor-pointer hover:text-green-800 hover:bg-yellow-300 p-2 rounded-md hidden lg:inline-flex">
        Coaching Staff
      </router-link>
      <router-link to="/staff" class="cursor-pointer text-green-800 bg-yellow-300 p-2 rounded-md inline-flex lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </router-link>
      <router-link to="/about" class="cursor-pointer hover:text-green-800 hover:bg-yellow-300 p-2 rounded-md hidden lg:inline-flex">
        About Edison
      </router-link>
      <router-link to="/staff" class="cursor-pointer text-green-800 bg-yellow-300 p-2 rounded-md inline-flex lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd" />
        </svg>
      </router-link>
      <router-link to="/news" class="cursor-pointer hover:text-green-800 hover:bg-yellow-300 p-2 rounded-md hidden lg:inline-flex">
        News
      </router-link>
      <router-link to="/staff" class="cursor-pointer text-green-800 bg-yellow-300 p-2 rounded-md inline-flex lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      </router-link>
    </div>
  </nav>
</template>
