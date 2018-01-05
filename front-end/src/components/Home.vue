<template>
<div class="header">
    <div class="container">
    <div class="nav">
    <a class="nav-item">Post</a>
    </div>
    </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>

<style scoped lang="less">
.header {
  background: #fff;
  .nav {
    a.nav-item {
      color: #333;
      text-decoration: none;
      padding: 0.5em 1em;
      display: inline-block;
      cursor: pointer;
      transition: background 0.15s ease-in-out;

      &:hover {
        background: #ddd;
      }
    }
  }
}

.container {
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
}
</style>
