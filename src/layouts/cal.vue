<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const isLoggedIn = ref(false)
const loginModal = ref({
  visibility: 'hidden',
})

const username = ref('')
const password = ref('')

const isAuth = async() => {
  try {
    const res = await fetch('/.netlify/functions/is-authenticated', {
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

const login = () => {
  fetch('/.netlify/functions/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username.value,
      password: password.value,
    }),
  })
    .then(res => res.json())
    .then((data) => {
      console.log(data)
      localStorage.setItem('token', data.code)
    })
    .catch((error) => {
      console.error(error)
    })
}

onBeforeMount(() => {
  isAuth().then((res) => {
    isLoggedIn.value = res
  })
})

const startLogin = () => {
  loginModal.value.visibility = 'visible'
}

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
      Calendar is not available yet to everyone.
    </p>
    <div class="flex space-x-4">
      <a
        class="cursor-pointer z-40 bg-green-800 px-6 py-2 text-yellow-400 rounded-md text-2xl font-semibold"
        @click="router.back()"
      >
        Back
      </a>
      <button
        class="cursor-pointer z-40 bg-green-800 px-6 py-2 text-yellow-400 rounded-md text-2xl font-semibold"
        @click="startLogin"
      >
        Login
      </button>
    </div>
  </div>
  <div
    class="fixed w-screen z-50 h-screen top-0 left-0 flex items-center justify-center login-modal bg-black bg-opacity-25"
  >
    <div class="w-[50%] h-[50%] rounded-lg text-green-800 p-4">
      <div class="py-4">
        <div
          class="relative px-6 py-10 overflow-hidden bg-green-700 border-4 border-green-700 shadow-xl rounded-2xl sm:px-12"
        >
          <div aria-hidden="true" class="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0">
            <svg
              class="absolute inset-0 w-full h-full"
              preserveAspectRatio="xMidYMid slice"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 1463 360"
            >
              <path
                class="text-green-500 text-opacity-40"
                fill="currentColor"
                d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z"
              ></path>
              <path
                class="text-green-700 text-opacity-40"
                fill="currentColor"
                d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z"
              ></path>
            </svg>
          </div>
          <div
            class="text-yellow-50 text-xl font-extrabold tracking-tight sm:text-2xl md:text-3xl"
          >
            Login as admin
          </div>
          <button
            class="text-green-800 bg-green-500 rounded-full w-7 h-7 flex items-center justify-center absolute top-4 right-4"
            @click="loginModal.visibility = 'hidden'"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <div class="relative flex-1 min-w-0 space-y-3">
            <label for="email" class="sr-only">Username</label>
            <input
              id="name"
              :value="username"
              name="name"
              type="text"
              class="block w-full px-5 py-3 text-sm lg:text-base text-gray-900 placeholder-gray-500 border border-transparent rounded-md shadow-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2"
              placeholder="Username"
              @input="(event) => (username = event.target.value)"
            />
            <label for="email" class="sr-only">Password</label>
            <input
              id="password"
              :value="password"
              name="password"
              type="password"
              placeholder="Password"
              class="block w-full px-5 py-3 text-sm lg:text-base text-gray-900 placeholder-gray-500 border border-transparent rounded-md shadow-sm focus:outline-none focus:border-transparent focus:ring-white focus:ring-2 focus:ring-offset-2"
              @input="(event) => (password = event.target.value)"
            />
          </div>
          <div class="mt-4 flex items-center justify-center relative z-50">
            <button
              type="submit"
              class="inline-flex justify-center items-center w-full px-5 py-3 text-sm lg:text-base font-medium text-gray-100 bg-green-500 border border-transparent rounded-md shadow hover:bg-green-400 focus:outline-none sm:px-10"
              @click="login"
            >
              <span>Login</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-modal {
  visibility: v-bind("loginModal.visibility");
}
</style>
