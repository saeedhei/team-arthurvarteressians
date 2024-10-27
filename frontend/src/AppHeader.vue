<!-- src/AppHeader.vue -->
<template>
  <header class="bg-slate-300 p-2 md:p-4 flex flex-col md:flex-row items-center justify-between">
    <div class="flex items-center" @click="redirectToHome" style="cursor: pointer;">
      <img src="./assets/bookStore.jpg" alt="Book Store" class="w-12 h-12 md:w-16 md:h-16 p-0" />
      <h1 class="ml-2 md:ml-4 text-lg md:text-xl font-bold">Book Store</h1>
    </div>
    <p class="hidden md:block text-gray-600 pr-5 text-sm md:text-base">Buch & Wein</p>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const redirectToHome = () => {
  router.replace('/');
};
</script>
