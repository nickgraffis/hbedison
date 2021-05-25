<script setup lang="ts">
import { ref } from 'vue'

const validEmail = ref(true)
const validName = ref(true)
const beenTouched = ref(false)

const touched = () => beenTouched.value = true

const checkEmails = (emails: string) => {
  const emailsArray = emails.split(', ')
  let validate = true
  emailsArray.forEach((e) => {
    const match = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(e)
    if (!match) validate = false
  })

  return validate
}

const formStatus = ref('')

const email = ref('')
const updateEmail = (event) => {
  const validate = checkEmails(event.target.value)
  console.log(validate)
  if (!validate) validEmail.value = false
  else validEmail.value = true
  console.log(validEmail.value)
  email.value = event.target.value
}

const name = ref('')
const updateName = (event) => {
  validName.value = true
  name.value = event.target.value
}

const processForm = (event: Event) => {
  event.preventDefault()
  if (!name.value) validName.value = false
  if (!email.value || !name.value || !validName.value || !validEmail.value) return
  formStatus.value = 'loading'
  const data = {
    name: name.value,
    emails: email.value,
  }
  fetch('/api/summer-signup', {
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.status < 300) formStatus.value = 'complete'
      else formStatus.value = 'error'
      console.log(res)
    })
    .catch((error) => {
      formStatus.value = 'error'
      console.log(error)
      return error
    })
}
</script>

<template>
  <div class="w-full px-3 my-6">
    <div class="relative">
      <div class="relative px-6 py-10 overflow-hidden bg-green-700 border-4 border-green-700 shadow-xl rounded-2xl sm:px-12">
        <div aria-hidden="true" class="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0">
          <svg class="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1463 360">
            <path class="text-green-500 text-opacity-40" fill="currentColor" d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z"></path>
            <path class="text-green-700 text-opacity-40" fill="currentColor" d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z"></path>
          </svg>
        </div>
        <div class="relative">
          <div class="text-yellow-50 text-xl font-extrabold tracking-tight sm:text-2xl md:text-3xl">
            Sign up for summer camp.
          </div>
          <p class="max-w-2xl mx-auto mt-4 text-sm lg:text-base text-yellow-50">
            Please sing up for summer camp here to make sure you get updates as we get closer to the camp. ⚡️
          </p>
          <p class="max-w-2xl mx-auto mt-4 text-sm lg:text-base text-yellow-50">
            You can get more information on the summer camp <a href="/summer">here</a>.
          </p>
          <form class="mt-6 mx-auto sm:max-w-lg" @submit="processForm">
            <div class="relative flex-1 min-w-0 space-y-3">
              <label for="email" class="sr-only">Athlete Name</label><input
                id="name"
                :value="name"
                name="name"
                type="text"
                :class="[validName ? 'focus:ring-offset-green-600 ' : 'focus:ring-offset-red-600']"
                class="block w-full px-5 py-3 text-sm lg:text-base text-gray-900 placeholder-gray-500 border border-transparent rounded-md shadow-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2"
                placeholder="Enter athlete's name"
                @blur="touched"
                @keyup="updateName"
              />
              <label for="email" class="sr-only">Email Addresses</label><input
                id="email"
                :value="email"
                name="email"
                type="text"
                :class="[validEmail ? 'focus:ring-offset-green-600 ' : 'focus:ring-offset-red-600']"
                class="block w-full px-5 py-3 text-sm lg:text-base text-gray-900 placeholder-gray-500 border border-transparent rounded-md shadow-sm focus:outline-none focus:border-transparent focus:ring-white focus:ring-2 focus:ring-offset-2"
                placeholder="Enter email addresses, seperated by comma "
                @blur="touched"
                @keyup="updateEmail"
              />
            </div>
            <div class="mt-4 flex items-center justify-center">
              <button type="submit" class="inline-flex justify-center items-center w-full px-5 py-3 text-sm lg:text-base font-medium text-white bg-green-500 border border-transparent rounded-md shadow hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:px-10">
                <span v-if="!formStatus">Sign Up</span>
                <div v-if="formStatus === 'loading'" className="w-full flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
                <div v-if="formStatus === 'complete'" className="w-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div v-if="formStatus === 'error'" className="w-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </button>
            </div>
          </form>
          <p v-if="!validName && beenTouched" class="flex items-start space-x-2 text-sm font-semibold text-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 flex-shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Please enter a name.</span>
          </p>
          <p v-if="!validEmail && beenTouched" class="flex items-start space-x-2 text-sm font-semibold text-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 flex-shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Please enter valid email(s), seperated by commas.</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
