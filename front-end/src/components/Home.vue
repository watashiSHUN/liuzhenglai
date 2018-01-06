<template>
  <div class="home">
    <div class="header">
      <div class="container">
        <div class="site-title">Liu Zhenglai</div>
        <div class="nav">
          <a class="nav-item active">Post</a>
        </div>
      </div>
    </div>
    <div class="body">
      <div class="container post-list">
        <div v-for="post in globalState.posts" class="post-item">{{ post.title }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import service from "../service";
export default {
  data() {
    return {
      globalState: store.state
    };
  },
  mounted() {
    service.getPosts().then(posts => {
      store.setPosts(posts);
    });
  }
};
</script>

<style scoped lang="less">
.header {
  background-color: #fff;
  .site-title,
  .nav {
    line-height: 3em;
  }
  .site-title {
    float: left;
    cursor: pointer;
  }
  .nav {
    float: right;
    a.nav-item {
      color: #333;
      text-decoration: none;
      padding: 0 1em;
      display: inline-block;
      cursor: pointer;
      transition: background-color 0.15s ease-in-out;

      &.active,
      &.active:hover {
        background-color: #007cdc;
        color: #fff;
      }

      &:hover {
        background-color: #ddd;
      }
    }
  }
}

.post-item {
  background-color: #fff;
  margin: 1em 0;
  padding: 1em;
}
</style>
