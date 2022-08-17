<script setup lang="ts">
import { Sheet } from 'bottom-sheet-vue3'
import { computed, onBeforeMount, ref } from 'vue'
import { createMonthViewMatrix } from '~/logic/calendar'
const categoryStyles = {
  boys: '#166534',
  girls: '#ec4899',
  practice: '#3b82f6',
  summer: '#ef4444',
}
const username = ref('')
const password = ref('')
const events = ref([])
const isLoggedIn = ref(false)
const modal = ref({
  visibility: 'hidden',
})
const contextItem = ref('')

const loginModal = ref({
  visibility: 'hidden',
})

const newEventModal = ref({
  visibility: 'hidden',
})

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

onBeforeMount(() => {
  fetch('/.netlify/functions/get-events')
    .then(res => res.json())
    .then((data) => {
      console.log(data)
      events.value = data
    })
    .catch((error) => {
      console.error(error)
    })

  isAuth().then((res) => {
    isLoggedIn.value = res
  })
})

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

const isOpen = ref(false)
const currentDate = ref(null)
const currentEvent = ref(null)
const month = ref(localStorage.getItem('lastMonth') || new Date().getMonth())
const year = ref(localStorage.getItem('lastYear') || new Date().getFullYear())
const monthViewMatrix = computed(() => createMonthViewMatrix(month.value, year.value))
console.log(monthViewMatrix.value)
const nextMonth = () => {
  month.value++
  if (month.value > 11) {
    month.value = 0
    year.value++
  }

  localStorage.setItem('lastMonth', month.value)
  localStorage.setItem('lastYear', year.value)
}

const prevMonth = () => {
  month.value--
  if (month.value < 0) {
    month.value = 11
    year.value--
  }

  localStorage.setItem('lastMonth', month.value)
  localStorage.setItem('lastYear', year.value)
}

const today = () => {
  month.value = new Date().getMonth()
  year.value = new Date().getFullYear()
  localStorage.setItem('lastMonth', month.value)
  localStorage.setItem('lastYear', year.value)
}

const openEventModal = (event: any) => {
  currentEvent.value = event
  modal.value.visibility = 'visible'
}

const openNewEventModal = () => {
  newEventModal.value.visibility = 'visible'
}

const selectDate = (date: any) => {
  currentDate.value = date
}

const clicks = ref(0)
let clickInterval
const doubleClick = (day: any) => {
  clicks.value++
  clickInterval = setTimeout(() => {
    clicks.value = 0
  }, 300)
  if (clicks.value === 2) {
    clicks.value = 0
    openNewEventModal(day)
    clearInterval(clickInterval)
  }
}

const deleteReoccuringEvent = () => {
  const event = events.value.find(e => e.id === currentEvent.value?.id && e.date === currentEvent.value?.date)
  console.log(event)
  const res = fetch(`/.netlify/functions/delete-event/${event?.id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      date: event.date,
    }),
  })
    .then(res => res.json())
    .then((data) => {
      console.log(data)
      events.value = events.value.filter(e => e.uuid !== currentEvent.value?.uuid)
      // close modal
      modal.value.visibility = 'hidden'
    })
    .catch((error) => {
      console.error(error)
    })
}

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

const logout = () => {
  localStorage.removeItem('token')
  isLoggedIn.value = false
}

const startLogin = () => {
  loginModal.value.visibility = 'visible'
}
</script>

<template>
  <div class="flex justify-between lg:items-center w-full pb-2 lg:px-0 px-2">
    <div class="w-full flex items-end space-x-2">
      <span class="font-black text-5xl text-green-800">{{ months[month] }}</span>
      <span class="font-semibold">{{ year }}</span>
    </div>
    <button
      class="flex text-green-800 items-center justify-center h-12 w-12 hover:bg-green-800 hover:bg-opacity-15 transition-transform duration-150 active:scale-95 cursor-pointer rounded-lg"
      @click="prevMonth"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
    <button
      class="flex text-green-800 items-center justify-center h-12 px-4 hover:bg-green-800 hover:bg-opacity-15 transition-transform duration-150 active:scale-95 cursor-pointer rounded-lg"
      @click="today"
    >
      <span class="font-semibold">Today</span>
    </button>
    <button
      class="flex text-green-800 items-center justify-center h-12 w-12 hover:bg-green-800 hover:bg-opacity-15 transition-transform duration-150 active:scale-95 cursor-pointer rounded-lg"
      @click="nextMonth"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  </div>
  <!-- <button @click=" isOpen = true ">
    Click Me Pleasseee
  </button>
  <Sheet v-model:visible=" isOpen ">
    Hello I am inside of sheet :) Try to slide down or click outside.
  </Sheet> -->
  <div
    v-for="(week, i) in monthViewMatrix?.current.weeks"
    :key="`${i}`"
    :class="`md:flex hidden border-green-800 ${
      i === 0 ? 'border-t border-b' : 'border-b'
    }`"
  >
    <div
      v-for="(day, j) in week.days"
      :key="`${i}-${j}`"
      class="w-full xl:w-48 xl:h-36 lg:w-36 lg:h-36 md:w-28 md:h-24 overflow-hidden"
    >
      <div
        :class="`${j === 0 ? 'border-l border-r' : 'border-r'} border-green-800 h-full`"
        @click="doubleClick(day)"
      >
        <div class="flex w-full">
          <span
            :class="`flex items-center justify-center h-8 w-8 m-1 font-semibold rounded-full ${
              day.isToday ? 'bg-green-800 text-white' : 'text-green-800'
            }`"
          >{{ parseInt(day?.date.split("-")[2]) }}</span>
        </div>
        <div
          v-for="(event, e) in events.filter((ev) => ev.date === day.date).sort((a, b) => new Date(new Date(a.date).getFullYear(), new Date(a.date).getMonth(), new Date(a.date).getDay(), a.startTime.split(':')[0], a.startTime.split(':')[1]) - new Date(new Date(b.date).getFullYear(), new Date(b.date).getMonth(), new Date(b.date).getDay(), b.startTime.split(':')[0], b.startTime.split(':')[1]))"
          :key="event.date"
        >
          <div
            v-if="event.isAllDay"
            class="relative z-50"
          >
            <div :class="`w-full px-1 py-0.5 flex items-center ${event.bgColor} ${event.textColor}`">
              <span :class="`font-semibold text-xs truncate ${!event?.isMultiDay || event.startDate === day.date ? event.textColor : 'text-transparent'}`">{{ event.title }}</span>
            </div>
          </div>
          <div
            v-else
            :class="`w-full relative px-1 py-0.5 flex flex-col text-green-800 space-x-1 cursor-pointer transition-all duration-150 active:scale-95 transform hover:bg-green-800 hover:bg-opacity-15`"
            @click="openEventModal(event)"
          >
            <div class="flex items-center space-x-1">
              <span
                :class="`${event.bgColor} h-1.5 w-1.5 rounded-full flex-shrink-0`"
              ></span>
              <p class="font-semibold text-xs flex-grow whitespace-nowrap truncate">
                {{ event.title }}
              </p>
              <p class="text-xs">
                <span>{{ event.startTime }}</span><span class="hidden"> - {{ event.endTime }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="w-full flex justify-end p-2">
    <button
      v-if="!isLoggedIn"
      class="px-4 py-2 hover:text-green-800 font-semibold hover:bg-yellow-300 transition-all cursor-pointer rounded-md"
      @click="startLogin"
    >
      Login
    </button>
    <button
      v-else
      class="px-4 py-2 hover:text-green-800 font-semibold hover:bg-yellow-300 transition-all cursor-pointer rounded-md"
      @click="logout"
    >
      Logout
    </button>
  </div>
  <div class="w-full md:hidden block">
    <div
      v-for="(week, i) in monthViewMatrix?.current.weeks"
      :key="`${i}`"
      class="w-full flex border-b border-green-800"
    >
      <div
        v-for="(day, j) in week.days"
        :key="`${i}-${j}`"
        class="w-full flex-grow flex flex-col items-center justify-center space-y-1 h-16 w-16"
      >
        <span
          :class="`font-semibold hover:bg-green-800 hover:bg-opacity-15 rounded-full cursor-pointer h-8 w-8 flex items-center justify-center ${
            currentDate === day.date ? 'bg-green-800 text-white' : 'text-green-800'
          }`"
          @click="selectDate(day.date)"
        >
          {{ parseInt(day?.date.split("-")[2]) }}
        </span>
        <span
          v-if="events.find((ev) => ev.date === day.date)"
          class="bg-green-800 h-1.5 w-1.5 rounded-full"
        ></span>
      </div>
    </div>
  </div>
  <div
    v-for="(event, e) in events.filter((ev) => ev.date === currentDate)"
    :key="event.date"
    class="lg:hidden block border-b border-green-800 flex w-full justify-start"
  >
    <div
      v-if="event.isAllDay"
      :class="`w-full px-1 py-0.5 flex items-center ${event.bgColor} ${event.textColor}`"
    >
      <span class="font-semibold text-sm">{{ event.title }}</span>
    </div>
    <div
      v-else
      :class="`w-full px-1 py-0.5 flex flex-col text-green-800 space-x-1 cursor-pointer transition-all duration-150 active:scale-95 transform hover:bg-green-800 hover:bg-opacity-15`"
      @click="openEventModal(event)"
    >
      <div class="flex items-start space-x-1">
        <span :class="`${event.bgColor} h-full w-1 rounded-full`"></span>
        <div class="flex-grow">
          <p class="font-semibold flex-grow">
            {{ event.title }}
          </p>
          <p class="flex-grow text-sm">
            {{ event.description }}
          </p>
          <p class="flex-grow text-sm">
            📍 {{ event.location }}
          </p>
        </div>
        <div>
          <p class="text-sm font-semibold">
            {{ event.startTime }}
          </p>
          <p class="text-sm">
            {{ event.endTime }}
          </p>
        </div>
      </div>
    </div>
  </div>
  <div
    class="fixed w-screen h-screen top-0 left-0 flex items-center justify-center z-50 modal bg-black bg-opacity-25"
  >
    <div class="w-[50%] h-[50%] rounded-lg bg-white text-green-800 p-4 relative">
      <div class="flex justify-between">
        <h1 class="text-2xl font-black">
          {{ currentEvent?.title }}
        </h1>
        <button class="text-green-800" @click="modal.visibility = 'hidden'">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <button v-if="isLoggedIn" class="text-green-800 absolute bottom-4 right-4" @click="deleteReoccuringEvent">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
      <div class="flex justify-between mb-1">
        <p class="text-xs font-semibold">
          {{ currentEvent?.startTime }} - {{ currentEvent?.endTime }}
        </p>
      </div>
      <div class="flex justify-between">
        <p class="font-semibold flex space-x-1 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{{ currentEvent?.location }}</span>
        </p>
      </div>
      <div class="flex justify-between">
        <p class="font-semibold flex space-x-1 items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24" class="w-5 h-5" fill="currentColor"><path d="M14 17H6v1.5A1.5 1.5 0 0 1 4.5 20h-1A1.5 1.5 0 0 1 2 18.5v-1.67A3.001 3.001 0 0 1 0 14v-3c0-.62.188-1.196.51-1.674l1.086-6.8A3 3 0 0 1 4.56 0h10.88a3 3 0 0 1 2.96 2.527l1.083 6.79c.326.48.516 1.06.516 1.683v3a3.001 3.001 0 0 1-2 2.83v1.67a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5V17zM3 15h14a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1zm14.25-6.99l-.824-5.168A1 1 0 0 0 15.44 2H4.559a1 1 0 0 0-.988.842l-.825 5.169A3.04 3.04 0 0 1 3 8h14c.084 0 .168.003.25.01zM15.5 12a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1zm0 2a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm-11-2a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1zm0 2a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm.704-10.906a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1z"></path></svg>
          <span v-if="currentEvent?.bus">
            Bus leaves @ {{ currentEvent?.busTime }}
          </span>
          <span v-else>No Bus</span>
        </p>
      </div>
      <div class="flex justify-between my-4">
        <p class="">
          {{ currentEvent?.description }}
        </p>
      </div>
      <div class="flex items-center space-x-2">
        <div
          v-for="(category, i) in currentEvent?.categories"
          :key="category"
          :style="`background-color: ${categoryStyles[category]}`"
          class="text-sm font-semibold px-3 py-1 rounded-lg text-white"
        >
          {{ category }}
        </div>
      </div>
    </div>
  </div>
  <div
    class="fixed w-screen h-screen top-0 left-0 flex items-center justify-center new-event-modal bg-black bg-opacity-25"
  >
    <div class="w-[50%] h-[50%] relative rounded-lg bg-white text-green-800 p-4">
      <div class="flex justify-between">
        <button
          class="text-green-800 absolute top-4 right-4"
          @click="newEventModal.visibility = 'hidden'"
        >
          X
        </button>
      </div>
      <FormKit
        type="text"
        name="name"
        label="Title"
        placeholder="Varsity Practice"
        help="What is the event called?"
        validation="required"
      />
      <div class="flex space-x-2 w-full">
        <FormKit
          type="time"
          label="Start time"
          value="23:15"
          help="What time does the event start?"
        />
        <FormKit
          type="time"
          label="End time"
          value="23:15"
          help="What time does the event end?"
        />
      </div>
      <FormKit
        v-model="value"
        type="checkbox"
        label="All Day"
        help="Is it an all day event?"
        name="terms"
      />
      <FormKit
        type="select"
        label="Event location?"
        name="location"
        :options="[
          'Monaco',
          'Vatican City',
          'Maldives',
          'Tuvalu',
        ]"
      />
      <FormKit
        v-model="value"
        type="checkbox"
        label="Categories"
        :options="['Mushrooms', 'Olives', 'Salami', 'Anchovies']"
        help="What categories does this event belong to?"
        validation="required|min:1"
      />
    </div>
  </div>
  <div
    class="fixed w-screen h-screen top-0 left-0 flex items-center justify-center login-modal bg-black bg-opacity-25"
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
.modal {
  visibility: v-bind("modal.visibility");
}

.login-modal {
  visibility: v-bind("loginModal.visibility");
}

.new-event-modal {
  visibility: v-bind("newEventModal.visibility");
}
</style>
