import Vue from 'vue'
import VueRouter from 'vue-router'
import Input from '../views/Input.vue'
import Thanks from '../views/Thanks.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'input',
    component: Input
  },
  {
    path: '/thanks',
    name: 'thanks',
    component: Thanks
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
