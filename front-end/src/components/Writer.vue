<template>
    <div class="writer-page page">
        <div class="body">
            <div class="post-list-column">
                <div class="btn btn-new-post" @click="newPost">New Post</div>
                <ul class="post-list">
                    <li class="btn post-item" v-for="post in globalState.posts" :key="post.id" @click="navToPost(post.id)" :class="{ active: post.id === $route.params.postId }">
                        <div class="post-title">{{ post.title }}</div>
                        <div class="btn btn-delete-post" @click="deletePost(post.id)">x</div>
                    </li>
                </ul>
            </div>
            <div class="post-editor-column" v-if="activePost">
                <input type="text" class="post-title" v-model="activePost.title" />
                <div class="action-bar">
                    <button class="btn btn-save" @click="savePost(activePost)">Save</button>
                </div>
                <textarea class="post-content" v-model="activePost.content">
                </textarea>
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
      activePost: null
    };
  },
  mounted() {
    service.getPosts().then(posts => {
      store.setPosts(posts);
      this.loadPost(this.$route.params.postId);
    });
  },
  watch: {
    $route(to, from) {
      this.loadPost(to.params.postId);
    }
  },
  methods: {
    newPost() {
      service.newPost();
    },
    deletePost(id) {
      service.deletePost(id);
    },
    navToPost(postId) {
      this.$router.push({
        name: "Writer",
        params: { postId: postId }
      });
    },
    loadPost(postId) {
      if (!postId) return;
      this.activePost = store.findPost(postId);
    },
    savePost(post) {
      service.updatePost(post);
    }
  }
};
</script>

<style scoped lang="less">
@import "../common.less";

.body {
  display: flex;
}

.btn {
  &:hover {
    background-color: @color-grey-light;
  }
}

.body,
.post-list-column,
.post-editor-column {
  height: 100%;
}
.post-list-column {
  width: 10em;
  border-right: solid 1px @color-grey;
  overflow: auto;
  .btn-new-post {
    text-align: center;
    padding: 1em;
    border-bottom: solid 1px @color-grey;
    cursor: pointer;
  }

  .post-list {
    .post-item {
      padding: 1em;
      box-shadow: inset 0 0 0 0 transparent;
      border-bottom: 1px solid @color-grey;
      cursor: pointer;
      transition: box-shadow 0.15s ease-in-out;

      &.active {
        box-shadow: inset 0.5em 0 0 0 @color-brand;
      }

      .post-title {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .btn-delete-post {
        display: inline-block;
        font-size: 0.8em;
        padding: 0.3em 0.5em;
        background-color: @color-red;
        color: #fff;
      }
    }
  }
}

.post-editor-column {
  flex: 1;
  display: flex;
  flex-direction: column;

  input[type="text"].post-title {
    font-size: 2em;
    padding: 0.5em 1em;
    border: 0;
    appearance: none;
  }

  .action-bar {
    .btn-save {
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
