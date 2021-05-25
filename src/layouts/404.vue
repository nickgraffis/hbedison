<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div class="w-screen flex-col space-y-12 bg-yellow-400 h-screen lg:text-10xl md:text-8xl text-5xl flex items-center justify-center text-green-800">
    <a class="top-36 z-40 text-2xl px-6 text-center font-semibold" @click="router.back()">
      The page you are looking for cannot be found.
    </a>
    <p class="font-black z-40 px-6 text-center">
      404
    </p>
    <a
      class="cursor-pointer z-40 bg-green-800 px-6 py-2 text-yellow-400 rounded-md text-2xl font-semibold"
      @click="router.back()"
    >
      Back
    </a>
  </div>
</template>
