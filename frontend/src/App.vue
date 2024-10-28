<!-- src/AppMainPage.vue -->
<template>
  <div v-if="$route.path === '/'">
    <AppHeader class="h-[10vh]" />
    <AppBodySection class="h-[80vh]" />
    <AppFooter  />
  </div>
  <router-view v-else></router-view>
</template>

<script setup lang="ts">
import AppHeader from './AppHeader.vue';
import AppFooter from './AppFooter.vue';
import AppBodySection from './AppBodySection.vue';
</script>
