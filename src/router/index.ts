import { createRouter as _createRouter, createWebHistory } from 'vue-router'

const HomeLayout = () => import('../layouts/HomeLayout.vue')
const E404View = () => import('../views/404.vue')

export function createRouter(){
  return _createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      // Home page (Single-Page Showcase)
      {
        path: '/',
        name: 'Home',
        component: HomeLayout
      },
      {
        path: '/index.html',
        redirect: '/'
      },

      // Games page redirect to single-page anchor
      {
        path: '/games',
        redirect: '/#games'
      },

      // Catch-all for 404
      {
        path: '/:pathMatch(.*)',
        name: 'NotFound',
        component: E404View
      }
    ],
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      }
      if (to.hash) {
        return {
          el: to.hash,
          behavior: 'smooth'
        };
      }
      return { top: 0, behavior: 'smooth' };
    }
  })
}
