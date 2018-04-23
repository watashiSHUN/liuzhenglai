<template>
  <div class="sign-in-page page">
    <div class="card absolute-hv-center tab">
      <div class="tab-buttons">
        <div class="tab-button" :class="{ active: activeTabIndex === 0 }" @click="changeTab(0)">Sign In</div>
        <div class="tab-button" :class="{ active: activeTabIndex === 1 }" @click="changeTab(1)">Sign Up</div>
      </div>
      <form class="tab-content sign-panel" :class="{ active: activeTabIndex === 0 }">
        <label>
          Email:
          <input type="email" v-model="email">
        </label>
        <label>
          Password:
          <input type="password" v-model="password">
        </label>
        <div class="err" v-text="err"></div>
        <button class="btn btn-primary" @click="signIn" :disabled="!email.trim() || !password">Sign In</button>
      </form>
      <form class="tab-content sign-panel" :class="{ active: activeTabIndex === 1 }">
        <label>
          Name:
          <input type="text" v-model="name">
        </label>
        <label>
          Email:
          <input type="email" v-model="email">
        </label>
        <label>
          Password:
          <input type="password" v-model="password">
        </label>
        <div class="err" v-text="err"></div>
        <button class="btn btn-primary" @click="signUp" :disabled="!name.trim() || !email.trim() || !password">Sign Up</button>
      </form>
    </div>
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
      name: "",
      err: ""
    };
  },
  computed: {
    activeTabIndex: function() {
      return this.$route.params.tab === "up" ? 1 : 0;
    }
  },
  methods: {
    signIn() {
      this.err = "";
      service.signIn(this.email, this.password).then(
        () => {
          this.$router.replace(`/posts/${store.state.user.id}`);
        },
        err => {
          if (err.response) {
            this.err = err.response.data;
          } else {
            this.err = err.message;
          }
        }
      );
    },
    signUp() {
      this.err = "";
      service.signUp(this.name, this.email, this.password).then(
        () => {
          this.$router.push("/");
        },
        err => {
          if (err.response) {
            this.err = err.response.data;
          } else {
            this.err = err.message;
          }
        }
      );
    },
    changeTab(index) {
      let tab = index === 0 ? "in" : "up";
      this.$router.replace(tab);
    }
  }
};
</script>

<style scoped lang="less">
@import "../less/common.less";

.tab {
  display: flex;
  flex-direction: column;
  padding: 0;
  overflow: hidden;
  .tab-buttons {
    display: flex;
    .tab-button {
      flex: 1;
      text-align: center;
      padding: @space-sm @space-md;
      cursor: pointer;
      background-color: var(--tab-button-background-color);
      &.active {
        background-color: var(--tab-button-active-background-color);
      }
    }
  }
  .tab-content {
    display: none;
    padding: @space-md;
    &.active {
      display: block;
    }
  }
}

.sign-panel {
  width: 15em;

  label {
    display: block;
    margin: 0.5em 0;

    input[type="text"],
    input[type="email"],
    input[type="password"] {
      display: block;
      margin: @space-xs 0;
      width: 100%;
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
