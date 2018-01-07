import Vue from 'vue'
import Router from 'vue-router'
import PostList from '@/components/PostList'
import Post from '@/components/Post'
import Writer from '@/components/Writer'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/posts',
      name: 'PostList',
      component: PostList
    },
    {
      path: '/post/:postId',
      name: 'Post',
      component: Post
    },
    {
      path: '/writer/:postId?',
      name: 'Writer',
      component: Writer
    }
  ]
})
