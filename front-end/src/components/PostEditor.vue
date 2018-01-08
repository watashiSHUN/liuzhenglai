<template>
    <div class="post-editor" v-if="post" @keydown.ctrl.83.prevent="savePost(post)">
        <input type="text" class="post-title" v-model="post.title" placeholder="Write your post title here..." />
        <div class="action-bar">
            <button class="btn btn-action btn-save" @click="savePost(post)">Save</button>
            <button class="btn btn-action btn-view" @click="viewPost(post)">View</button>
            <button class="btn btn-action btn-live-edit" @click="liveEditPost(post)">LiveEdit</button>
        </div>
        <textarea class="post-content" v-model="post.content" placeholder="Write your post here...">
        </textarea>
    </div>
</template>

<script>
import service from "../service";
export default {
  props: ["post"],
  mounted() {},
  methods: {
    savePost(post) {
      service.updatePost(post);
    },
    viewPost(post) {
      this.$router.push({
        name: "Post",
        params: { postId: post.id }
      });
    },
    liveEditPost(post) {
      this.$router.push({
        name: "LiveEditor",
        params: { postId: post.id }
      });
    }
  }
};
</script>

<style scoped lang="less">
@import "../less/common.less";

.post-editor {
  height: 100%;
  display: flex;
  flex-direction: column;

  input[type="text"].post-title {
    font-size: 2em;
    padding: 0.5em 1em;
    border: 0;
    appearance: none;
  }

  .action-bar {
    .btn-action {
      border: 0;
      background-color: transparent;
      padding: 0.5em 1em;
      &:hover {
        background-color: @color-grey;
        color: #fff;
      }
    }
  }

  textarea.post-content {
    padding: 0.5em 1em;
    appearance: none;
    border: 0;
    resize: none;
    overflow: auto;
    flex: 1;
  }
}
</style>
