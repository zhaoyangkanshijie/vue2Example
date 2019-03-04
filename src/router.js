import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import MyComponent from './views/MyComponent.vue'
import Page from './views/Page.vue'
import Other from './views/Other.vue'
import Login from './views/Login.vue'
import UserHome from './views/UserHome.vue'
import CourseVideo from './views/CourseVideo.vue'
import Material from './views/Material.vue'
import Exception from './views/Exception.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/myComponent',
      name: 'myComponent',
      component: MyComponent
    },
    {
      path: '/page',
      name: 'page',
      component: Page
    },
    {
      path: '/other',
      name: 'other',
      component: Other
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/forgetAccount',
      name: 'forgetAccount',
      component: Login
    },
    {
      path: '/forgetPassword',
      name: 'forgetPassword',
      component: Login
    },
    {
      path: '/resetPassword',
      name: 'resetPassword',
      component: Login
    },
    {
      path: '/userHome/information',
      name: 'userInformation',
      component: UserHome
    },
    {
      path: '/userHome/password',
      name: 'userPassword',
      component: UserHome
    },
    {
      path: '/coursevideo/:id',
      name: 'coursevideo',
      component: CourseVideo
    },
    {
      path: '/material',
      name: 'material',
      component: Material
    },
    {
      path: '/exception',
      name: 'exception',
      component: Exception
    }
  ]
})
