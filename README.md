## A Simple Static Site Generator
Made for [Edison High School Water Polo](https://edisonwp.com)

## The Stack

- ⚡️ [Vue 3](https://github.com/vuejs/vue-next), [Vite 2](https://github.com/vitejs/vite), [pnpm](https://pnpm.js.org/), [ESBuild](https://github.com/evanw/esbuild)

- 🗂 [File based routing](./src/pages)

- 📦 [Components auto importing](./src/components)

- 📑 [Layout system](./src/layouts)

- 🎨 [Windi CSS](https://github.com/windicss/windicss)

- 🗒 [Markdown Support](https://github.com/antfu/vite-plugin-md)

- 🔥 Use the [new `<script setup>` style](https://github.com/vuejs/rfcs/pull/227)

- 🖨 Server-side generation (SSG) via [vite-ssg](https://github.com/antfu/vite-ssg)

- 🦾 TypeScript

- ☁️ Hosted by [Netlify](https://www.netlify.com)

- 🥞 Data hosted with [AirTable](https://airtable.com)

This started as an implementation of [Vitisse](https://github.com/antfu/vitesse)

## Cool Features

- 📧 Email system from markdown files with mustache ({{ }}) context, for personalized emails.

- 📆 Calendar system, events stored on AirTable.

- 🔐 Login system, extreamly simple login system with web tokens and IP address verification.

- 📝 Some forms and such with data coming from AirTable.
