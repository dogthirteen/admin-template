import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/admin',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Home.vue'),
    children: [
      {
        path: '/admin',
        name: 'Admin',
        component: () => import('@/views/Admin'),
      },
      {
        path: '/me',
        name: 'Me',
        component: () => import('@/views/Me'),
      },
    ],
  },
]

const router = new VueRouter({
  routes,
})

export default router
