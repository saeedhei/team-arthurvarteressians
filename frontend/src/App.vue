<!-- src/AppMainPage.vue -->
<template>
  <div class="w-screen h-screen flex flex-col">
    <AppHeader class="h-[10vh]" />
    <div class="flex-1 overflow-hidden">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </div>
    <AppFooter class="h-[10vh]" />
  </div>
</template>

<script setup lang="ts">
import AppHeader from './AppHeader.vue';
import AppFooter from './AppFooter.vue';
</script>
