<template>
     <div class="popup-container">
       <SuccessIcon v-if="type === 'success'" />
       <WarningIcon v-if="type === 'warning'" />
       <ErrorIcon v-if="type === 'error'" />
       <h2>{{ title }}</h2>
       <p>{{ message }}</p>
       <button @click="confirmAction">OK</button>
       
       <!-- Loading Overlay for success confirmation -->
       <LoadingOverlay :show="showOverlay" :message="overlayMessage" @hideOverlay="showOverlay = false" />
     </div>
   </template>
   
   <script setup lang="ts">
   import { ref } from 'vue';
   import SuccessIcon from './SuccessIcon.vue';
   import WarningIcon from './WarningIcon.vue';
   import ErrorIcon from './ErrorIcon.vue';
   import LoadingOverlay from './LoadingOverlay.vue';
   
   // Define props
   const props = defineProps<{
     type: string;
     title: string;
     message: string;
   }>();
   
   // Define emit function
   const emit = defineEmits(['actionConfirmed']);
   
   const showOverlay = ref(false);
   const overlayMessage = ref('');
   
   // Function to handle OK button click
   const confirmAction = () => {
     if (props.type === 'success') {
       overlayMessage.value = 'Operation was successful!';
     } else if (props.type === 'error') {
       overlayMessage.value = 'An error occurred!';
     } else if (props.type === 'warning') {
       overlayMessage.value = 'Please be cautious!';
     }
     showOverlay.value = true;
   
     // Emit actionConfirmed event to inform parent if needed
     emit('actionConfirmed');
   };
   </script>
   
   <style scoped>
   /* Popup container styles */
   .popup-container {
     background-color: white;
     padding: 20px;
     border-radius: 10px;
     box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
     text-align: center;
   }
   button {
     padding: 10px 20px;
     margin-top: 20px;
     background-color: #4CAF50;
     color: white;
     border: none;
     border-radius: 5px;
     cursor: pointer;
   }
   button:hover {
     background-color: #45a049;
   }
   </style>
   