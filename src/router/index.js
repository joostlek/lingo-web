import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Games from '@/views/Games'
import Dictionaries from '@/views/Dictionaries'
import GameDetail from '@/views/GameDetail'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/games',
    name: 'Games',
    component: Games
  },
  {
    path: '/games/:gameId',
    name: 'GameDetail',
    component: GameDetail
  },
  {
    path: '/dictionaries',
    name: 'Dictionaries',
    component: Dictionaries
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
