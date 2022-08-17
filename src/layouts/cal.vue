<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const isLoggedIn = ref(false)
const isAuth = async() => {
  try {
    const res = await fetch('/api/is-authenticated', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        token: localStorage.getItem('token'),
      }),
    })
    const data = await res.json()
    console.log(data)
    return data
  }
  catch (error) {
    console.error(error)
    throw error
  }
}

onBeforeMount(() => {
  isAuth().then((res) => {
    isLoggedIn.value = res
  })
})

</script>
<template>
  <main v-if="isLoggedIn" className="min-h-screen w-screen bg-yellow-400 text-gray-800">
    <div className="flex flex-col mx-auto items-center min-h-screen md:px-0 lg:px-8">
      <div class="w-full px-2 lg:max-w-4xl">
        <Header />
      </div>
      <router-view />
      <div class="max-w 4xl">
        <Footer />
      </div>
    </div>
  </main>
  <div v-else class="w-screen flex-col space-y-12 bg-yellow-400 h-screen lg:text-4xl md:text-3xl text-2xl flex items-center justify-center text-green-800">
    <p class="font-black z-40 px-6 text-center">
      Calendar is not available yet.
    </p>
    <a
      class="cursor-pointer z-40 bg-green-800 px-6 py-2 text-yellow-400 rounded-md text-2xl font-semibold"
      @click="router.back()"
    >
      Back
    </a>
  </div>
</template>
