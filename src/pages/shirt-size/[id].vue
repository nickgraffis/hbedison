<script setup lang="ts">
import { onBeforeMount, defineProps, ref } from 'vue'
import { animate, spring } from 'motion'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})
type User = {
  id: string
  fields: {
    Name: string
    ShirtSize: string
  }
}

const user = ref<User | null>(null)
const toast = ref(null)
const sizes = ref(['S', 'M', 'L', 'XL', '2XL'])
onBeforeMount(() => {
  fetch(`/api/shirt-size/${props.id}`)
    .then(res => res.json())
    .then((data) => {
      user.value = data
    })
    .catch((error) => {
      console.error(error)
    })
})
const updatedTimeout = ref<any | null>(null)
const updateSize = (size: string) => {
  clearTimeout(updatedTimeout.value)
  if (updatedTimeout.value) {
    animate('#toast', { y: -200 }, { easing: spring() })
    clearTimeout(updatedTimeout.value)
  }
  if (!user.value) return
  user.value.fields.ShirtSize = size
  fetch(`/api/shirt-size/${props.id}`, {
    method: 'POST',
    body: JSON.stringify({ size }),
  })
    .then(res => res.json())
    .then((data) => {
      user.value = data
      animate('#toast', { y: 100 }, { easing: spring() })
      updatedTimeout.value = setTimeout(() => {
        animate('#toast', { y: -200 }, { easing: spring() })
        updatedTimeout.value = null
      }, 3000)
    })
    .catch((error) => {
      console.error(error)
    })
}
</script>
<template>
  <div class="flex-grow flex flex-col items-center">
    <h1 class="text-green-800 text-xl font-extrabold tracking-tight sm:text-2xl md:text-3xl">
      👋 Hey, {{ user?.fields.Name.split(' ')[0] }}
    </h1>
    <ul class="flex flex-col items-center p-4">
      <li
        v-for="size in sizes"
        :key="size"
        :class="`cursor-pointer my-2 hover:bg-yellow-300 transform hover:scale-105 active:scale-95 transition-transform duration-150 text-green-800 border-4 rounded-lg text-xl font-extrabold tracking-tight sm:text-2xl md:text-3xl h-16 w-16 flex items-center justify-center ${user?.fields.ShirtSize === size ? 'border-green-800' : 'border-transparent'}`"
        @click="updateSize(size)"
      >
        <span>{{ size }}</span>
      </li>
    </ul>
  </div>

  <div id="toast" style="transform: translateY(-200px)" class="fixed z-50 text-center sm:left-16 px-12 py-4 w-[90%] sm:w-auto rounded-lg bg-green-800 text-yellow-50  text-base font-extrabold tracking-tight sm:text-lg md:text-xl">
    Updated your shirt size!
  </div>
</template>
