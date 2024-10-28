<template>
     <div class="notification-container">
       <label for="notification-type">Select Notification Type:</label>
       <select v-model="selectedType" id="notification-type">
         <option value="success">Success</option>
         <option value="warning">Warning</option>
         <option value="error">Error</option>
       </select>
   
       <div class="notification-icon">
         <SuccessIcon v-if="selectedType === 'success'" />
         <WarningIcon v-if="selectedType === 'warning'" />
         <ErrorIcon v-if="selectedType === 'error'" />
       </div>
     </div>
   </template>
   
   <script setup lang="ts">
   import { ref } from 'vue';
   import SuccessIcon from './SuccessIcon.vue';
   import WarningIcon from './WarningIcon.vue';
   import ErrorIcon from './ErrorIcon.vue';
   
   const selectedType = ref('success'); // Default to success icon
   </script>
   
   <style scoped>
   .notification-container {
     display: flex;
     flex-direction: column;
     align-items: center;
     margin-top: 20px;
   }
   
   #notification-type {
     margin-bottom: 20px;
     padding: 8px;
     font-size: 1rem;
   }
   
   .notification-icon {
     margin-top: 20px;
   }
   </style>
   