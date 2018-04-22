<template>
  <div class="header">
    <div class="container">
      <a class="site-title" href="#/">Liu Zhenglai</a>
      <div class="nav" v-if="!globalState.user.id">
        <a class="nav-item" href="#/sign/in">Sign in</a>
        <a class="nav-item" href="#/sign/up">Sign up</a>
      </div>
      <div class="nav" v-else>
        <a class="nav-item" :href="`#/posts/${globalState.user.id}`">Post</a>
        <a class="nav-item" href="#/writer">New Post</a>
        <a class="nav-item" @click="signOut">Sign out</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      globalState: store.state
    };
  },
  mounted() {},
  methods: {
    signOut() {
      localStorage.removeItem("token");
      store.reset();
      this.$router.push("/");
    }
  }
};
</script>

<style scoped lang="less">
@import "../less/common.less";
</style>
