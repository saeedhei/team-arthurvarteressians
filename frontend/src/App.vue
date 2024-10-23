<script setup lang="ts">
import bookStore from './assets/bookStore.jpg'
</script>

<template>
  <div class="w-screen min-h-screen flex flex-col">
    <!-- Header Section -->
    <header class="bg-slate-300 p-4 flex items-center justify-between">
      <div class="flex items-center">
        <img :src="bookStore" alt="Book Store" class="w-20 h-20 p-0" />
        <h1 class="ml-4 text-3xl font-bold">Book Store</h1>
      </div>
      <p class="text-gray-600 pr-10 text-xl">Welcome to the great book store!</p>
    </header>

    <!-- Content Section (80vh) -->
    <main
      class="flex-1 flex items-center justify-center bg-slate-100"
      style="min-height: 80vh"
    >
      <!-- Add your buttons or other content here -->
      <button
        class="px-6 py-3 bg-blue-500 text-white text-lg rounded-lg hover:bg-blue-700"
      >
        Button 1
      </button>
      <button
        class="ml-4 px-6 py-3 bg-green-500 text-white text-lg rounded-lg hover:bg-green-700"
      >
        Button 2
      </button>
    </main>

    <!-- Footer Section -->
    <footer class="bg-slate-400 p-4 flex items-center justify-around">
      <div class="flex items-center">
        <h2 class="text-lg font-semibold">© 2024 All Rights Reserved</h2>
      </div>

      <div class="flex items-center">
        <h2 class="text-lg font-semibold">Lorem ipsum dolor sit amet</h2>
      </div>
      <p class="text-base">Consetetur sadipscing</p>
    </footer>
  </div>
</template>
