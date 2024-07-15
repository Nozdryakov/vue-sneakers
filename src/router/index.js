import { createRouter, createWebHistory } from 'vue-router'
import Favorites from "@/views/Favorites.vue";
import Home from "@/views/Home.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
      {
      path: '/favorites',
      name: 'favorites',
      component: Favorites
    },
  ]
})

export default router
