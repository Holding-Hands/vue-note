import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Slot from '../components/Slot/Slot'
import Accordion from '../components/Accordion'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', name: 'Home', component: Home },
  { path: '/Slot', name: 'Slot', component: Slot },
  { path: '/Accordion', name: 'Accordion', component: Accordion }, // 手风琴
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
