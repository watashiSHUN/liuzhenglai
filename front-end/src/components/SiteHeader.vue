<template>
  <div class="site-header">
    <div class="container">
      <a class="site-title" href="#/">Liu Zhenglai</a>
      <div class="nav" v-if="!globalState.user.id">
        <a class="nav-item" href="#/sign/in">Sign In</a>
        <a class="nav-item" href="#/sign/up">Sign Up</a>
      </div>
      <div class="nav" v-else>
        <a class="nav-item" :href="`#/posts/${globalState.user.id}`">Post</a>
        <a class="nav-item" href="#/writer">New Post</a>
        <a class="nav-item" @click="menuActive = !menuActive">
          <img class="avatar" :src="globalState.user.avatar" />
          <div class="nav-menu card popover" :class="{ active: menuActive }">
            <a class="btn btn-block" href="#/settings">Settings</a>
            <div class="btn btn-block" @click="signOut">Sign Out</div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      globalState: store.state,
      menuActive: false
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

.site-header {
  height: 3em;
  background-color: var(--nav-background-color);
  .container {
    height: 100%;
  }
  .site-title,
  .nav-item {
    transition: background-color 0.15s ease-in-out;
    padding: 0 @space-md;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
    &:hover {
      background-color: @color-grey-light;
    }
  }
  .site-title {
    float: left;
  }
  .nav {
    height: 100%;
    float: right;
    display: flex;
    a.nav-item {
      color: var(--text-color);
      text-decoration: none;
      cursor: pointer;
      &.active,
      &.active:hover {
        background-color: @color-brand;
        color: #fff;
      }
    }
  }

  .nav-menu.card {
    display: none;
    position: absolute;
    right: 0;
    bottom: 0;
    transform: translateY(100%);
    width: 10em;
    padding: @space-xs 0;
    background-color: var(--nav-background-color);
    z-index: @nav-menu-z-index;
    &.active {
      display: block;
    }
  }
}
</style>
