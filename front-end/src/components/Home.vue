<template>
    <div class="post-page page">
        <site-header></site-header>
        <div class="body">
            <div class="container">
                <div class="self-intro">
                    <p>I am Liu Zhenglai, born in China, currently working Washinton U.S.</p>
                    <p>I'm a full-stack engineer.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import service from "../service";
import moment from "moment";
import marked from "marked";
export default {
  data() {
    return {
      globalState: store.state
    };
  },
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="less">
@import "../less/common.less";

.self-intro {
  margin-top: 3em;
  text-align: center;
  p {
    font-size: 1.5em;
  }
  p + p {
    margin-top: 1em;
  }
}
</style>
