<template>
  <div class="post-list-page page">
    <site-header></site-header>
    <div class="body">
      <div class="container">
        <ul class="post-list item-list">
          <li v-for="post in globalState.posts" :key="post.id" class="item" @click="navToPost(post.id)">
            <a class="post-link">
              <div class="post-title">
                {{ post.title }}
              </div>
              <div class="post-meta">{{ post.createdAtDate }}</div>
              <div class="post-excerpt marked" v-marked="post.content"></div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import service from "../service";
import moment from "moment";
export default {
  data() {
    return {
      globalState: store.state,
      moment: moment
    };
  },
  mounted() {
    service.getPosts(this.$route.params.userId).then(posts => {
      store.setPosts(posts);
    });
  },
  methods: {
    navToPost(postId) {
      this.$router.push({
        name: "Post",
        params: { postId: postId }
      });
    }
  }
};
</script>

<style scoped lang="less">
@import "../less/common.less";

.body {
  padding-top: 1em;
}

.post-list {
  > li.item {
    padding: 0;
    transition: box-shadow @anim-duration-short ease-in-out;

    &:hover {
      box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.06);
    }

    .post-link {
      display: block;
      position: relative;
      text-decoration: none;
      color: var(--text-color);

      &:hover .post-title {
        color: @color-brand;
      }
    }

    .post-title {
      font-size: 1.5em;
      text-align: center;
      padding: @space-md;
      border-bottom: 1px solid var(--border-color);
      -webkit-transition: color 0.2s ease-in-out;
      transition: color 0.2s ease-in-out;
    }

    .post-excerpt {
      font-size: 0.8em;
      padding: @space-md;
    }

    .post-meta {
      position: absolute;
      top: 0;
      right: 0;
      font-size: @small-font-size;
      color: var(--secondary-text-color);
      padding: 0.3em 1em;
      box-shadow: inset 0 -1px 2px @color-grey-light;
      border-top-right-radius: @default-border-radius;
      border-bottom-left-radius: @default-border-radius;
    }

    .post-read-more {
      color: @color-brand;
      text-decoration: underline;

      &:hover {
        text-decoration: none;
      }
    }
  }
}
</style>
