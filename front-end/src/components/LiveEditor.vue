<template>
  <div class="live-editor-page page">
    <div class="body">
      <div class="post-editor-column">
        <post-editor v-bind:post="post"></post-editor>
      </div>
      <div class="preview-column">
        <div class="preview" v-if="post">
          <div class="preview-title">{{ post.title }}</div>
          <div class="preview-content marked" v-marked="post.content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import service from "../service";
export default {
  data() {
    return {
      globalState: store.state,
      post: null
    };
  },
  mounted() {
    let postId = this.$route.params.postId;
    this.loadPost(postId);
  },
  methods: {
    loadPost(postId) {
      this.post = store.findPost(postId);
    }
  }
};
</script>

<style scoped lang="less">
@import "../less/common.less";

.body {
  height: 100%;
  display: flex;
  .post-editor-column,
  .preview-column {
    flex: 1;
  }

  .preview-column {
    background-color: #fff;
    border-left: 1px solid var(--border-color);
    overflow: auto;

    .preview-title {
      font-size: 2em;
      padding: 0.5em 1em;
    }

    .preview-content {
      padding: 1em;
    }
  }
}
</style>
