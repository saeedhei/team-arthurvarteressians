<template>
     <div v-if="show" class="overlay">
       <p class="overlay-text">{{ message }}</p>
     </div>
   </template>
   
   <script setup lang="ts">
   import { defineProps, defineEmits, watch } from 'vue';
   
   // Define props for custom message and visibility control
   const props = defineProps<{
     show: boolean;
     message: string;
   }>();
   
   // Define emit function
   const emit = defineEmits(['hideOverlay']);
   
   // Automatically hide after a few seconds (optional)
   watch(() => props.show, (newVal) => {
     if (newVal) {
       setTimeout(() => {
         emit('hideOverlay'); // Emit hideOverlay event after timeout
       }, 2000); // Adjust time as needed
     }
   });
   </script>
   
   <style scoped>
   .overlay {
     position: fixed;
     top: 0;
     left: 0;
     width: 100%;
     height: 80vh;
     background: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
     color: white;
     display: flex;
     align-items: center;
     justify-content: center;
     font-size: 1.5rem;
     z-index: 1000;
   }
   
   .overlay-text {
     text-align: center;
     font-size: 2rem;
     font-weight: bold;
   }
   </style>
   