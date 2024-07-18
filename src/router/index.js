import { createRouter, createWebHistory } from 'vue-router'
import FavoritesView from "@/views/FavoritesView.vue";
import HomeView from "@/views/HomeView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
      {
      path: '/favorites',
      name: 'favorites',
      component: FavoritesView
    },
  ]
})

export default router
