import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'traffic-lights',
      component: () => import('@/pages/TrafficLights.vue')
    },
  ]
})

export default router
