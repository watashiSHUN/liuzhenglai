// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import moment from 'moment';
import marked from 'marked';
import base64url from 'base64url';

Storage.prototype.setJson = function (key, val) {
  this.setItem(key, JSON.stringify(val));
};

Storage.prototype.getJson = function (key) {
  return JSON.parse(this.getItem(key));
};

Vue.config.productionTip = false;

function getToken() {
  let token = localStorage.getJson('token');
  if (!token) {
    return undefined;
  }

  let parts = token.split('.');
  if (parts.length !== 3) {
    return undefined;
  }

  let payload = parts[1];
  return JSON.parse(base64url.decode(payload));
}

window.store = {
  state: {
    posts: [],
    user: {
      userId: null,
      email: null,
      avatar: null,
      name: null
    }
  },
  setPosts(posts) {
    posts.forEach(p => p.createdAtDate = moment(p.createdAt).format('MMM D, YYYY'));
    this.state.posts = posts;
  },
  newPost(post) {
    this.state.posts.unshift(post);
  },
  deletePost(postId) {
    this.state.posts.splice(this.state.posts.findIndex(p => p.id === postId), 1);
  },
  findPostIndex(postId) {
    if (!postId) return null;
    return this.state.posts.findIndex(p => p.id === postId);
  },
  findPost(postId) {
    if (!postId) return null;
    return this.state.posts.find(p => p.id === postId);
  },
  getNextActivePost(postId) {
    let index = this.findPostIndex(postId);
    if (index + 1 < this.state.posts.length) {
      return this.state.posts[index + 1];
    } else if (index - 1 >= 0) {
      return this.state.posts[index - 1];
    } else {
      return null;
    }
  },
  findPrevPost(postId) {
    let index = this.findPostIndex(postId);
    if (index === null || index - 1 < 0) return null;
    return this.state.posts[index - 1];
  },
  findNextPost(postId) {
    let index = this.findPostIndex(postId);
    if (index === null || index + 1 >= this.state.posts.length) return null;
    return this.state.posts[index + 1];
  },
  updateToken(token) {
    localStorage.setJson('token', token);
    this.loadToken();
  },
  loadToken() {
    let payload = getToken();
    if (!payload) {
      return;
    }
    
    this.state.user.id = payload.id;
    this.state.user.avatar = payload.avatar || '/static/user.svg';
    this.state.user.email = payload.email;
    this.state.user.name = payload.name;
  },
  reset() {
    this.state.posts = [];
    this.state.user.id = null;
  }
};

store.loadToken();

Vue.directive('marked', (el, binding) => {
  el.innerHTML = marked(binding.value || '');
});

// Register components
Vue.component('post-editor', require('./components/PostEditor.vue').default);
Vue.component('site-header', require('./components/SiteHeader.vue').default);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});