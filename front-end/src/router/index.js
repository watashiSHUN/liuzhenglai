import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Writer from '@/components/Writer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/writer/:postId?',
      name: 'Writer',
      component: Writer
    }
  ]
})
