// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import _ from 'lodash'

Vue.config.productionTip = false

window.store = {
  state: {
    posts: []
  },
  setPosts(posts) {
    this.state.posts = posts
  },
  newPost(post) {
    this.state.posts.unshift(post)
  },
  deletePost(postId) {
    this.state.posts.splice(this.state.posts.findIndex(p => p.id === postId), 1)
  }
}


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
