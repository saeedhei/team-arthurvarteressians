<!-- NotificationPopup.vue -->
<template>
     <div v-if="visible" class="popup-overlay">
       <div class="popup-content">
         <div class="popup-icon">
           <!-- Render the appropriate icon based on the type -->
           <SuccessIcon v-if="type === 'success'" />
           <WarningIcon v-if="type === 'warning'" />
           <ErrorIcon v-if="type === 'error'" />
         </div>
         <h2 class="popup-title">{{ title }}</h2>
         <p class="popup-message">{{ message }}</p>
         <button @click="closePopup" class="popup-button">OK</button>
       </div>
     </div>
   </template>
   
   <script setup lang="ts">
   import { ref, watch, defineProps, defineEmits } from 'vue';
   import SuccessIcon from './SuccessIcon.vue';
   import WarningIcon from './WarningIcon.vue';
   import ErrorIcon from './ErrorIcon.vue';
   
   // Define props
   const props = defineProps({
     type: {
       type: String,
       required: true,
     },
     title: {
       type: String,
       default: '',
     },
     message: {
       type: String,
       default: '',
     },
     show: {
       type: Boolean,
       default: false,
     },
   });
   
   // Define emit to close the popup
   const emit = defineEmits(['close']);
   
   const visible = ref(props.show);
   
   // Watch for changes in the 'show' prop to control visibility
   watch(() => props.show, (newVal) => {
     visible.value = newVal;
   });
   
   const closePopup = () => {
     visible.value = false;
     // Emit an event to notify the parent component
     emit('close');
   };
   </script>
   
   <style scoped>
   .popup-overlay {
     position: fixed;
     top: 0;
     left: 0;
     right: 0;
     bottom: 0;
     background: rgba(0, 0, 0, 0.4);
     display: flex;
     align-items: center;
     justify-content: center;
     z-index: 1000;
   }
   
   .popup-content {
     background-color: #fff;
     border-radius: 8px;
     padding: 20px;
     width: 300px;
     text-align: center;
     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
   }
   
   .popup-icon {
     margin-bottom: 15px;
   }
   
   .popup-title {
     font-size: 1.5em;
     margin: 0;
   }
   
   .popup-message {
     font-size: 1em;
     color: #555;
   }
   
   .popup-button {
     margin-top: 15px;
     padding: 10px 20px;
     border: none;
     background-color: #6366f1;
     color: white;
     border-radius: 4px;
     cursor: pointer;
   }
   </style>
   