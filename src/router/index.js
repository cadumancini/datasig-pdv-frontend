import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Menu from '../views/Menu.vue'
import Venda from '../views/Venda.vue'
import ConsultaPedidos from '../views/ConsultaPedidos.vue'

const routes = [
  {
    path: '/',
    name: 'Menu',
    component: Menu
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/venda',
    name: 'Venda',
    component: Venda
  },
  {
    path: '/consulta-pedidos',
    name: 'ConsultaPedidos',
    component: ConsultaPedidos
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
