import Vue from 'vue';
import Router from 'vue-router';
import PostList from '@/components/PostList';
import Post from '@/components/Post';
import Writer from '@/components/Writer';
import Home from '@/components/Home';
import LiveEditor from '@/components/LiveEditor';
import Sign from '@/components/Sign';
import Settings from '@/components/Settings';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/posts/:userId',
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
    },
    {
      path: '/live/:postId',
      name: 'LiveEditor',
      component: LiveEditor
    },
    {
      path: '/sign/:tab',
      name: 'Sign',
      component: Sign
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    }
  ]
});