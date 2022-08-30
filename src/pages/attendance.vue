<script setup lang="ts">
import { ref } from '@vue/reactivity'
import { onBeforeMount } from '@vue/runtime-core'
const date = `${new Date().getMonth() + 1}/${new Date().getDate()}/${new Date().getFullYear()}`
const attendance = ref([])
onBeforeMount(() => {
  fetch('/.netlify/functions/attendance')
    .then(res => res.json())
    .then((data) => {
      console.log(data)
      attendance.value = data
    })
    .catch((err) => {
      console.log(err)
    })
})
</script>

<template>
  <div v-for="att in attendance" class="w-full rounded-md border border-green-800 flex items-center justify-between text-green-800 font-semibold px-4 py-2 my-2">
    <p>{{ att.Name }}</p>
    <div class="flex flex-col space-y-1 items-center">
      <div class="flex items-center space-y-1">
        <div class="w-6 h-6 rounded border-2 border-green-800"></div>
        <p>Present</p>
      </div>
      <div class="flex items-center space-y-1">
        <div class="w-6 h-6 rounded border-2 border-green-800"></div>
        <p>Late</p>
      </div>
      <div class="flex items-center space-y-1">
        <div class="w-6 h-6 rounded border-2 border-green-800"></div>
        <p>Excused</p>
      </div>
      <div class="flex items-center space-y-1">
        <div class="w-6 h-6 rounded border-2 border-green-800">
          <span v-if="att.attendance?.[date] === 'Absent'">✅</span>
        </div>
        <p>Absent</p>
      </div>
    </div>
  </div>
</template>
