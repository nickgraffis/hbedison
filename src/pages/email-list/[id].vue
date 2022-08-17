<script setup lang="ts">
import { onBeforeMount, defineProps, ref, computed } from 'vue'
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
const user = ref<{ fields: { Name: string } } | null>(null)
const emails = ref<{email: string; isAthlete?: boolean}[] | null>(null)
const redactedEmail = computed(() => {
  if (!emails.value?.length) return []
  return emails.value.map((emailObj) => {
    // remove all but the last 4 chars before the @
    const [e, ...rest] = emailObj.email?.split('@')
    return { email: `***${e.slice(e.length - 6, e.length)}@${rest.join('@')}`, isAthlete: emailObj?.isAthlete }
  })
})
onBeforeMount(() => {
  fetch(`/api/email-list/${props.id}`)
    .then(res => res.json())
    .then((data) => {
      const athleteEmails = data?.fields?.AthleteEmails.split(',').map(e => ({ email: e.trim(), isAthlete: true })) || []
      const parentEmails = data?.fields?.ParentEmails?.split(',').map(e => ({ email: e.trim(), isAthlete: false })) || []
      const allEmails = [...athleteEmails, ...parentEmails]
      emails.value = allEmails
      user.value = data
    })
    .catch((error) => {
      console.error(error)
    })
})
const updatedTimeout = ref<any | null>(null)
const stagedEmail = ref<{ email: string; isAthlete: boolean } | null>(null)
const undo = () => {
  clearTimeout(updatedTimeout.value)
  if (updatedTimeout.value) {
    animate('#toast', { y: -200 }, { easing: spring() })
    clearTimeout(updatedTimeout.value)
  }
  if (!emails.value) return
  const newEmails = [
    ...emails.value || [],
    stagedEmail.value || { email: '', isAthlete: false },
  ]
  emails.value = newEmails
}

const deleteEmail = (emailObj: { email: string; isAthlete: boolean }) => {
  if (!emails.value?.length) return
  emails.value = emails.value?.filter((e) => {
    return e.email !== emailObj.email
  }) || []
  stagedEmail.value = emailObj
  animate('#toast', { y: 100 }, { easing: spring() })
  updatedTimeout.value = setTimeout(() => {
    animate('#toast', { y: -200 }, { easing: spring() })
    updatedTimeout.value = null
    fetch(`/api/email-list/${props.id}`, {
      method: 'DELETE',
      body: JSON.stringify({ email: emailObj.email }),
    })
      .then(res => res.json())
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, 5000)
}

const changeEmailAthleteStatus = (email: string, isAthlete: boolean) => {
  emails.value = emails.value?.map((e) => {
    if (e.email === email)
      e.isAthlete = isAthlete
    return e
  }) || []
  fetch(`/api/email-list/${props.id}`, {
    method: 'PUT',
    body: JSON.stringify({ email, isAthlete }),
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
}
</script>
<template>
  <client-only>
    <div class="flex-grow flex flex-col items-center">
      <h1 class="text-green-800 text-xl font-extrabold tracking-tight sm:text-2xl md:text-3xl">
        👋 Hey, {{ user?.fields.Name.split(' ')[0] }}
      </h1>
      <ul class="flex flex-col items-center p-4">
        <li
          v-for="emailObj in emails"
          :key="emailObj.email"
          :class="`cursor-pointer space-y-2 my-2 text-green-800 px-8 py-3 rounded-lg text-lg font-semibold tracking-tight`"
        >
          <div class="flex space-x-2 items-center">
            <span>{{ `***${emailObj.email.split('@')[0].slice(emailObj.email.split('@')[0].length - 6, emailObj.email.split('@')[0].length)}@${emailObj.email.split('@')[1]}` }}</span>
            <div
              class="p-2 rounded-md hover:bg-yellow-300 transform hover:scale-105 active:scale-95 transition-transform duration-150"
              @click="deleteEmail(emailObj)"
            >
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
          </div>
          <div class="w-full flex space-x-3">
            <div
              :class="`p-2 border-2 ${emailObj.isAthlete ? 'border-green-800' : 'border-transparent'} flex-grow rounded-md text-center hover:bg-yellow-300 transform hover:scale-105 active:scale-95 transition-transform duration-150`"
              @click="changeEmailAthleteStatus(emailObj.email, !emailObj.isAthlete)"
            >
              Athlete
            </div>
            <div
              :class="`p-2 border-2 ${!emailObj.isAthlete ? 'border-green-800' : 'border-transparent'} flex-grow rounded-md text-center hover:bg-yellow-300 transform hover:scale-105 active:scale-95 transition-transform duration-150`"
              @click="changeEmailAthleteStatus(emailObj.email, !emailObj.isAthlete)"
            >
              Parent
            </div>
          </div>
        </li>
        <li class="w-full space-y-3 cursor-pointer">
          <Form :id="props.id" />
        </li>
      </ul>
    </div>

    <div id="toast" style="transform: translateY(-200px)" class="flex space-x-12 items-center fixed z-50 text-center sm:left-16 px-12 py-4 w-[90%] sm:w-auto rounded-lg bg-green-800 text-yellow-50  text-base font-extrabold tracking-tight sm:text-lg md:text-xl">
      <span>Deleted Email</span>
      <div class="px-3 py-1.5 rounded-lg border-white border-2 hover:bg-green-700 cursor-pointer font-semibold" @click="undo()">
        Undo
      </div>
    </div>
  </client-only>
</template>
