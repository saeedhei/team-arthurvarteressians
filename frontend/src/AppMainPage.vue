<!-- src/AppMainPage.vue -->
<template>
  <div class="w-screen min-h-screen flex flex-col">
    <AppHeader />
      <router-view />
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from './AppHeader.vue';
import AppFooter from './AppFooter.vue';
</script>
