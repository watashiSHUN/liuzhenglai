<template>
  <div class="home">
    <div class="header">
      <div class="container">
        <div class="nav">
          <a class="nav-item">Post</a>
        </div>
      </div>
    </div>
    <div class="body">
      <div class="container">
        <div v-for="post in posts" class="post-card">{{ post }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: ["123", "123", "123", "123", "123", "123"]
    };
  }
};
</script>

<style scoped lang="less">
.header {
  background-color: #fff;
  .nav {
    a.nav-item {
      color: #333;
      text-decoration: none;
      padding: 0.5em 1em;
      display: inline-block;
      cursor: pointer;
      transition: background-color 0.15s ease-in-out;

      &:hover {
        background-color: #ddd;
      }
    }
  }
}

.post-card {
  background-color: #fff;
  margin: 1em 0;
  padding: 1em;
}
</style>
