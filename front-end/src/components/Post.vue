<template>
  <div class="post-page page">
    <site-header></site-header>
    <div class="body">
      <div class="container" v-if="post">
        <button class="btn-back-top popover" @click="backTop">^</button>
        <div class="clearfix pre-post-nav">
          <button class="prev-post" @click="navToPost(prevPost)" v-if="prevPost">Prev</button>
          <button class="next-post" @click="navToPost(nextPost)" v-if="nextPost">Next</button>
        </div>
        <article class="post">
          <div class="action-row">
            <button class="btn btn-default btn-edit-post" @click="editPost(post)" v-if="globalState.user.id === post.author">Edit</button>
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
    service.getPost(this.$route.params.postId).then(post => {
      this.loadPost(post);
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
    loadPost(post) {
      this.post = post;
      // this.post = store.findPost(postId);
      // this.prevPost = store.findPrevPost(postId);
      // this.nextPost = store.findNextPost(postId);
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
    },
    backTop() {
      let elem = document.documentElement;
      let top = elem.scrollTop;

      let timer = setInterval(function() {
        top -= Math.abs(top * 0.3);
        if (top <= 1) {
          top = 0;
          clearInterval(timer);
        }
        elem.scrollTop = top;
      }, 20);
    }
  }
};
</script>

<style scoped lang="less">
@import "../less/common.less";

.body {
  padding: @space-xl 0;
}

.btn-back-top {
  position: fixed;
  right: @space-xxl;
  bottom: @space-xxl;
  background-color: var(--card-background-color);
  width: 3em;
  height: 3em;
  z-index: @float-button-z-index;
  border-radius: @default-border-radius;
}

.prev-post,
.next-post {
  display: inline-block;
  color: #888;
  background-color: #fafafa;
  border-radius: 0.3em;
  padding: 0.5em 1em;
  transition: background-color @anim-duration-short ease-in-out;
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
