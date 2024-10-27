<!-- src/App.vue -->
<template>
  <div class="w-screen min-h-screen flex flex-col">
    <AppHeader />
    <AppBodySection />
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from './AppHeader.vue';
import AppBodySection from './AppBodySection.vue';
import AppFooter from './AppFooter.vue';
</script>
