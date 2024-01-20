import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
// import Menu from '../views/Menu.vue'

const routes = [
  {
    path: '/',
    name: 'Menu',
    component: Login
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
