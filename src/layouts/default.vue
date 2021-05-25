<script setup lang="ts">
import { onMounted } from '@vue/runtime-core'

onMounted(() => {
  fetch('https://api.db-ip.com/v2/free/self').then(
    res => res.json().then(
      (res) => {
        fetch('/.netlify/functions/add-visitor', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ip: res.ipAddress,
            ref: document.referrer,
            ts: Date.now(),
            entry: window.location.href,
            action: 'enter',
          }),
        })
      },
    ),
  )
})
</script>
<template>
  <main className="min-h-screen h-full w-screen bg-cullen text-nosferatu dark:text-cullen dark:bg-nosferatu">
    <div className="flex flex-col mx-auto items-center max-w-2xl min-h-screen px-8 md:px-0 lg:px-0">
      <Header />
      <router-view />
      <Footer />
    </div>
  </main>
</template>
