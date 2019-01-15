import Vue from 'vue'
import store from './store/store'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import AddCourse from './views/AddCourse.vue'
import CourseDetail from './views/CourseDetail.vue'
import PageNotFound from './views/PageNotFound.vue'
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
      path: '/add-course',
      name: 'add-course',
      component: AddCourse,
      meta: { requiresAuth : true }
    },
    {
      path: '/course/:courseName',
      name: 'course-detail',
      component: CourseDetail,
      meta: { requiresAuth : true },
      props: true,
      beforeEnter: (to, from, next) => {
        // check course exists
        store.dispatch('getCourse', to.params.courseName)
          .then((result) => {
            result ? next() : next('/404')
          }).catch((error) => {
            throw(error)
          })
      }       
    },
    {
      path: '/void',
      name: 'void',
      component: Void,
      meta: { requiresAuth : true }
    },
    {
      path: '/404',
      name: 404,
      component: PageNotFound,
    },
    {
      path: '*',
      redirect: '/404'
    },
    
  ]
})
