<template>
  <div class="sign-up-page page">
    <form class="sign-up-panel card absolute-hv-center">
      <label>Email:
        <input type="email" v-model="email">
      </label>
      <label>
        Password:
        <input type="password" v-model="password">
      </label>
      <div class="err" v-text="err"></div>
      <button class="btn btn-primary" @click="signUp" :disabled="!email.trim() || !password">Sign Up</button>
    </form>
  </div>
</template>

<script>
import service from "../service";
export default {
  data() {
    return {
      globalState: store.state,
      email: "",
      password: "",
      err: ""
    };
  },
  mounted() {},
  methods: {
    signUp() {
      this.err = "";
      service.signUp(this.email, this.password).then(
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

.sign-up-panel {
  width: 15em;

  label {
    display: block;
    margin: 0.5em 0;

    input[type="email"],
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
