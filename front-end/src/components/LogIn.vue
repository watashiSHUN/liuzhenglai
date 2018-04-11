<template>
  <div class="log-in-page page">
    <form class="login-panel card">
      <label>Email:
        <input type="text" v-model="username">
      </label>
      <label>
        Password:
        <input type="password" v-model="password">
      </label>
      <div class="err" v-text="err"></div>
      <button class="btn btn-primary" @click="logIn" :disabled="!username.trim() || !password">Log In</button>
    </form>
  </div>
</template>

<script>
import service from "../service";
export default {
  data() {
    return {
      globalState: store.state,
      username: "",
      password: "",
      err: ""
    };
  },
  mounted() {},
  methods: {
    logIn() {
      this.err = "";
      service.logIn(this.username, this.password).then(
        () => {
          this.$router.push("/");
        },
        err => {
          this.err = err.response.data;
        }
      );
    }
  }
};
</script>

<style scoped lang="less">
@import "../less/common.less";

.login-panel {
  &:extend(.absolute-hv-center);
  width: 15em;

  label {
    display: block;
    margin: 0.5em 0;

    input[type="text"],
    input[type="password"] {
      display: block;
      margin: 0.2em 0;
      width: 100%;
      box-sizing: border-box;

      padding: 0.5em;
      border: 1px solid var(--input-border-color);
      border-radius: @default-border-radius;
    }
  }

  .err {
    color: var(--color-error);
    font-size: 0.8em;
  }

  .btn {
    margin-top: 1em;
    float: right;
  }
}
</style>
