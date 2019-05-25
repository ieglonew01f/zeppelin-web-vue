/*
  Importing the real stuff
  vuejs + vue router + vuex
*/

import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '',
      component: Home
    },
    {
      path: '/notebook/:id',
      name: 'id',
      component: Home
    }
  ]
})
