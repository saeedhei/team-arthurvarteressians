<!-- src/AppMainPage.vue -->
<template>
  <div class="w-screen min-h-screen flex flex-col">
    <AppHeader />
    <MainBody>
      <router-view />
    </MainBody>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from './AppHeader.vue';
import MainBody from './MainBody.vue';
import AppFooter from './AppFooter.vue';
</script>
