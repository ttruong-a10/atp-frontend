import Vue from 'vue'
import store from './store'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Void from './views/Void.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth : true }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { requiresAuth : false },
      beforeEnter: (to, from, next) => {
        if(store.state.authenticated) {
            next({ name: 'home'})
        }
        next()
      }
    },
    {
      path: '/void',
      name: 'void',
      component: Void,
      meta: { requiresAuth : true }
    },
    
  ]
})
