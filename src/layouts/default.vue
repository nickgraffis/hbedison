<script setup lang="ts">

</script>
<template>
  <main className="min-h-screen w-screen bg-yellow-400 text-gray-800">
    <div className="flex flex-col mx-auto items-center max-w-4xl min-h-screen px-8 md:px-0 lg:px-0">
      <Header />
      <router-view />
      <Footer />
    </div>
  </main>
</template>
