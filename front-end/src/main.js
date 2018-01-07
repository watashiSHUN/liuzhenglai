// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

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
  },
  findPost(postId) {
    if (!postId) return null
    return this.state.posts.find(p => p.id === postId)
  },
  getNextActivePost(postId) {
    let index = this.state.posts.findIndex(p => p.id === postId)
    if (index + 1 < this.state.posts.length) {
      return this.state.posts[index + 1]
    } else if (index - 1 >= 0) {
      return this.state.posts[index - 1]
    } else {
      return null
    }
  }
}


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
