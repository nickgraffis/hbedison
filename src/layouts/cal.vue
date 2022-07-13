<script setup lang="ts">

</script>
<template>
  <main className="min-h-screen w-screen bg-yellow-400 text-gray-800">
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
</template>
