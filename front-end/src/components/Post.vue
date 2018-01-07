<template>
  <div class="post-page page">
    <div class="header">
      <div class="container">
        <a class="site-title" href="#/">Liu Zhenglai</a>
        <div class="nav">
          <a class="nav-item active" href="#/posts">Post</a>
        </div>
      </div>
    </div>
    <div class="body">
      <div class="container" v-if="post">
        <div class="clearfix pre-post-nav">
          <button class="prev-post" @click="navToPost(prevPost)" v-if="prevPost">Prev</button>
          <button class="next-post" @click="navToPost(nextPost)" v-if="nextPost">Next</button>
        </div>
        <article class="post">
          <div class="action-row">
            <button class="btn btn-default btn-edit-post" @click="editPost(post)">Edit</button>
          </div>
          <div class="post-header">
            <div class="post-title">
              {{post.title}}
            </div>
            <div class="post-created-at">
              {{post.createdAtDate}}
            </div>
          </div>
          <div class="post-content marked" v-marked="post.content">
          </div>
        </article>
        <div class="clearfix post-post-nav">
          <button class="prev-post" @click="navToPost(prevPost)" v-if="prevPost">Prev</button>
          <button class="next-post" @click="navToPost(nextPost)" v-if="nextPost">Next</button>
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
      globalState: store.state,
      moment: moment,
      post: null,
      prevPost: null,
      nextPost: null
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
    navToPost(postId) {
      this.$router.push({
        name: "Post",
        params: { postId: postId }
      });
    },
    loadPost(postId) {
      this.post = store.findPost(postId);
      this.prevPost = store.findPrevPost(postId);
      this.nextPost = store.findNextPost(postId);
    },
    navToPost(post) {
      if (!post) return;
      this.$router.push({
        name: "Post",
        params: { postId: post.id }
      });
    },
    editPost(post) {
      this.$router.push({
        name: "Writer",
        params: { postId: post.id }
      });
    }
  }
};
</script>

<style scoped lang="less">
@import "../less/common.less";

.body {
  padding-top: 2em;
}

.prev-post,
.next-post {
  display: inline-block;
  color: #888;
  background-color: #fafafa;
  border-radius: 0.3em;
  padding: 0.5em 1em;
  transition: background-color 0.2s ease-in-out;
  text-decoration: none;
  appearance: none;
  border: 0;

  &:hover {
    background-color: #fff;
  }
}

.next-post {
  float: right;
}

.pre-post-nav {
  .prev-post,
  .next-post {
    padding-bottom: 1.5em;
    margin-bottom: -1em;
  }
}

.post-post-nav {
  .prev-post,
  .next-post {
    padding-top: 1.5em;
    margin-top: -1em;
  }
}

.post {
  &:extend(.card);
  position: relative;
  z-index: 1;
  padding: 2em;

  .action-row {
    text-align: right;
  }

  .post-header {
    border-bottom: solid 1px @color-grey-light;
    padding-bottom: 1em;
    .post-title {
      font-size: 2em;
      text-align: center;
    }
    .post-created-at {
      text-align: right;
      font-size: 0.8em;
      color: @color-grey;
    }
  }

  .post-content {
    padding-top: 1em;
  }
}
</style>
