import { createRouter, createWebHistory } from 'vue-router'
import ManagerPage from '../ManagerPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/manager',
      name: 'ManagerPage',
      component: ManagerPage,
    },
  ],
})

export default router
