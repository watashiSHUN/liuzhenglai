<template>
  <div class="writer-page page">
    <div class="body">
      <div class="post-list-column">
        <div class="btn btn-action display-block" @click="backHome">Back Home</div>
        <div class="btn btn-action display-block" @click="newPost">New Post</div>
        <ul class="post-list">
          <li class="btn post-item display-block" v-for="post in globalState.posts" :key="post.id" @click="navToPost(post.id)" :class="{ active: post.id === $route.params.postId }">
            <div class="post-title">{{ post.title }}</div>
            <div class="btn btn-delete-post" @click="deletePost(post.id)">x</div>
          </li>
        </ul>
      </div>
      <div class="post-editor-column">
        <post-editor v-bind:post="activePost"></post-editor>
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
    service.getPosts(store.state.user.id).then(posts => {
      store.setPosts(posts);
      let postId = this.$route.params.postId;
      if (!postId && store.state.posts.length) {
        this.navToPost(store.state.posts[0].id, true);
      } else {
        this.loadPost(postId);
      }
    });
  },
  watch: {
    $route(to, from) {
      this.loadPost(to.params.postId);
    }
  },
  methods: {
    newPost() {
      service.newPost().then(post => {
        this.navToPost(post.id);
      });
    },
    deletePost(id) {
      let nextActivePost = store.getNextActivePost(id);
      service.deletePost(id).then(() => {
        this.navToPost(nextActivePost ? nextActivePost.id : null);
      });
    },
    navToPost(postId, replace) {
      let params = {
        name: "Writer",
        params: { postId: postId }
      };
      if (replace) {
        this.$router.replace(params);
      } else {
        this.$router.push(params);
      }
    },
    loadPost(postId) {
      this.activePost = store.findPost(postId);
    },
    backHome() {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped lang="less">
@import "../less/common.less";

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
  width: 15em;
  border-right: solid 0.5em @color-grey-light;
  overflow: auto;
  .btn-action {
    text-align: center;
    padding: 1em;
    border-bottom: solid 1px @color-grey-light;
  }

  .post-list {
    .post-item {
      padding: 1em;
      padding-left: 1.5em;
      box-shadow: inset 0 0 0 0 transparent;
      border-bottom: 1px solid @color-grey-light;
      cursor: pointer;
      transition: box-shadow @anim-duration-short ease-in-out;

      &.active {
        box-shadow: inset 0.5em 0 0 0 @color-brand;
      }

      .post-title {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        height: 1.5em;
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
}
</style>
