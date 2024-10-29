<template>
  <div> 
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
    <div v-for="index in 6" :key="index" class="skeleton-item p-4 flex justify-center flex-col items-center bg-white rounded-lg shadow-md">
      <div class="skeleton-line h-4 w-1/4 mb-2 rounded bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse"></div>
      <div class="skeleton-line h-4 w-1/2 mb-2 rounded bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse"></div>
      <div class="skeleton-line h-4 w-3/4 mb-2 rounded bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse"></div>
      <div class="skeleton-square w-16 h-16 mt-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-bounce"></div>
    </div>
  </div>
  </div>
  
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
