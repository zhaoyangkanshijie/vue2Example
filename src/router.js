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
import mLogin from './mobile/views/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/myComponent',
      name: 'myComponent',
      component: () => import('./views/MyComponent.vue')
    },
    {
      path: '/page',
      name: 'page',
      component: () => import('./views/Page.vue')
    },
    {
      path: '/other',
      name: 'other',
      component: () => import('./views/Other.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/m/login',
      name: 'mlogin',
      component: () => import('./mobile/views/Login.vue')
    },
    {
      path: '/forgetAccount',
      name: 'forgetAccount',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/forgetPassword',
      name: 'forgetPassword',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/resetPassword',
      name: 'resetPassword',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/userHome/information',
      name: 'userInformation',
      component: () => import('./views/UserHome.vue')
    },
    {
      path: '/userHome/password',
      name: 'userPassword',
      component: () => import('./views/UserHome.vue')
    },
    {
      path: '/coursevideo/:id',
      name: 'coursevideo',
      component: () => import('./views/CourseVideo.vue')
    },
    {
      path: '/material',
      name: 'material',
      component: () => import('./views/Material.vue')
    },
    {
      path: '/exception',
      name: 'exception',
      component: () => import('./views/Exception.vue')
    },
    {
      path: '/slider',
      name: 'slider',
      component: () => import('./views/Slider.vue')
    }
  ]
})
