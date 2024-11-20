import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Menu from '../views/Menu.vue'
import Venda from '../views/Venda.vue'
import ConsultaPedidos from '../views/ConsultaPedidos.vue'
import ConsultaNotas from '../views/ConsultaNotas.vue'
import ConsultaMovimentos from '../views/ConsultaMovimentos.vue'
import ConsultaTitulos from '../views/ConsultaTitulos.vue'

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
  },
  {
    path: '/consulta-notas',
    name: 'ConsultaNotas',
    component: ConsultaNotas
  },
  {
    path: '/consulta-movimentos',
    name: 'ConsultaMovimentos',
    component: ConsultaMovimentos
  },
  {
    path: '/consulta-titulos',
    name: 'ConsultaTitulos',
    component: ConsultaTitulos
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
