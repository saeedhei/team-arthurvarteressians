// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import AppBodySection from '@/AppBodySection.vue';
import ManagerPage from '@/ManagerPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: AppBodySection, // Main content section
  },
  {
    path: '/manager',
    name: 'Manager',
    component: ManagerPage, // Manager dashboard
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Had an issue, changed tsconfig.json file
  routes,
});

export default router;
