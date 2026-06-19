import { createRouter as _createRouter, createWebHistory } from 'vue-router'

const HomeLayout = () => import('../layouts/HomeLayout.vue')
const GamesLayout = () => import('../layouts/GamesLayout.vue')
const E404View = () => import('../views/404.vue')

export function createRouter(){
  return _createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      // Home page
      {
        path: '/',
        name: 'Home',
        component: HomeLayout
      },

      // Games page
      {
        path: '/games',
        name: 'Games',
        component: GamesLayout
      },

      // Catch-all for 404
      {
        path: '/:pathMatch(.*)',
        name: 'NotFound',
        component: E404View
      }
    ]
  })
}
