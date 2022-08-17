<script setup lang="ts">
import { defineProps, ref } from 'vue'

const props = defineProps<{ name: string }>()

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
const updateEmail = (event: any) => {
  const validate = checkEmails(event.target.value)
  if (!validate) validEmail.value = false
  else validEmail.value = true
  email.value = event.target.value
}

const name = ref('')
const updateName = (event: any) => {
  validName.value = true
  name.value = event.target.value
}

const processForm = (event?: Event) => {
  event?.preventDefault()
  if (!name.value) validName.value = false
  if (!email.value || !name.value || !validName.value || !validEmail.value) return
  formStatus.value = 'loading'
  const data = {
    name: name.value,
    emails: email.value,
  }
  fetch('/.netlify/functions/summer-signup', {
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.status < 300) formStatus.value = 'complete'
      else formStatus.value = 'error'
    })
    .catch((error) => {
      formStatus.value = 'error'
      return error
    })
}
</script>

<template>
  <p class="w-full text-green-800 text-xl font-extrabold tracking-tight sm:text-2xl md:text-3xl">
    👋 Hey, {{ props.name }}! Here are you current emails:
  </p>
  <ul class="space-y-4 place-self-start py-4 flex-grow">
    <li class="px-4 py-2 rounded-lg hover:bg-yellow-300 flex space-x-4 items-center">
      <p class="font-semibold text-base lg:text-xl text-green-800">
        ***fs@gmail.com
      </p>
      <div class="p-2 rounded-md hover:bg-yellow-400 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24" class="h-6 w-6 text-green-800" fill="currentColor"><path d="M16.907 4.44l-7.655 7.655c.227.325.42.676.575 1.048l1.91 4.599 5.17-13.303zm-9.002 6.308l7.656-7.656-13.303 5.17 4.599 1.911a5.51 5.51 0 0 1 1.048.575zm11.618-7.862l-6.027 15.506c-.38.98-1.477 1.483-2.449 1.124a1.831 1.831 0 0 1-1.057-1.017L8.08 13.9a3.662 3.662 0 0 0-1.98-1.98l-4.6-1.91C.546 9.613.11 8.51.528 7.544a1.95 1.95 0 0 1 1.08-1.04L17.114.475a1.852 1.852 0 0 1 2.41 2.41z"></path></svg>
      </div>
      <div class="p-2 rounded-md hover:bg-yellow-400 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-green-800"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </div>
    </li>
    <li class="px-4 py-2 rounded-lg hover:bg-yellow-300 flex space-x-4 items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-green-800"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="3"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
      </svg>
      <p class="font-semibold text-base lg:text-xl text-green-800">
        Add New Email
      </p>
    </li>
  </ul>
</template>
