import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

Vue.config.productionTip = false


router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth)
  {
    if(!store.state.authenticated)
    {
      // get path that user is trying to reach before redirecting to login
      const loginpath = window.location.pathname
      next({ 
        name: 'login', 
        query: { from: loginpath }
      })
    }
  }
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
