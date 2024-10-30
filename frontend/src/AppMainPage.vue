<script setup lang="ts">
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'
</script>

<template>
  <div class="w-screen min-h-screen flex flex-col">
    <AppHeader />
    <router-view />
    <AppFooter />
  </div>
</template>