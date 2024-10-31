<template>
  <div v-if="$route.path === '/'">
    <AppHeader class="h-[10vh]" />
    <AppBodySection class="h-[80vh]" />
    <AppFooter  />
  </div>
  <router-view v-else></router-view>
</template>

<script setup lang="ts">
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import AppBodySection from './components/AppBodySection.vue';
</script>
