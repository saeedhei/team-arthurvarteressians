<template>
     <div class="container mx-auto flex flex-wrap justify-center items-center">
       <div v-for="index in 3" :key="index" class="box w-full max-w-sm px-4">
         <div class="skeleton bg-white shadow-md rounded-lg p-4 mb-4">
           <div class="skeleton-left flex-1 pr-4">
             <div class="line h-4 w-1/2 mb-2"></div>
             <div class="line h-2 w-3/4 mb-2"></div>
             <div class="line h-2 w-1/2 mb-2"></div>
             <div class="line h-2 w-3/4"></div>
           </div>
           <div class="skeleton-right flex justify-center items-center">
             <div class="square w-20 h-20 rounded-lg"></div>
           </div>
         </div>
       </div>
     </div>
   </template>
   
   <script lang="ts" setup>
   </script>
   
   <style scoped>
   .skeleton .square,
   .skeleton .line {
     background: linear-gradient(
       90deg,
       rgba(130, 130, 130, 0.2) 25%,
       rgba(130, 130, 130, 0.3) 50%,
       rgba(130, 130, 130, 0.2) 75%
     );
     background-size: 200% 100%;
     animation: shimmer 2s infinite;
   }
   
   @keyframes shimmer {
     0% {
       background-position: -100% 0;
     }
     100% {
       background-position: 100% 0;
     }
   }
   </style>
   