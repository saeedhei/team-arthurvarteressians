<template>
     <section class="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
       <!-- Header Section -->
       <header class="text-center mb-6">
         <h1 class="text-3xl font-bold text-blue-600 mb-2">Manager Dashboard</h1>
         <p class="text-lg text-gray-700">Welcome to the manager section.</p>
       </header>
   
       <!-- Content Section -->
       <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
         <p class="text-gray-800 mb-4">This section contains manager functionalities.</p>
   
         <!-- Action Button -->
         <button
           @click="handleAction"
           class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
         >
           Perform Action
         </button>
   
         <!-- Action Counter Display -->
         <p class="mt-4 text-gray-600">Actions performed: {{ actionCount }}</p>
       </div>
     </section>
   </template>
   
   <script setup lang="ts">
   import { ref } from 'vue';
   import { useToast } from 'vue-toastification';
   
   const toast = useToast();
   const actionCount = ref(0);
   
   const handleAction = () => {
     actionCount.value++;
     toast.success(`Action performed successfully! Count: ${actionCount.value}`);
   };
   </script>
   
   <style scoped>
   /* Tailwind CSS handles the styling, so no additional styles are needed here */
   </style>
   