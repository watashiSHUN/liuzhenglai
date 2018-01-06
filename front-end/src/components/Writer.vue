<template>
    <div class="writer-page page">
        <div class="body">
            <div class="post-column">
                <div class="btn-new-post" @click="newPost">新建文章</div>
                <ul class="post-list">
                    <li class="post-item" v-for="post in globalState.posts" :key="post.id">
                        <div class="post-title">{{ post.title }}</div>
                        <div class="btn-delete-post" @click="deletePost(post.id)">x</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import service from "../service";
export default {
  data() {
    return {
      globalState: store.state
    };
  },
  mounted() {
    service.getPosts().then(posts => {
      store.setPosts(posts);
    });
  },
  methods: {
    newPost() {
      service.newPost();
    },
    deletePost(id) {
      service.deletePost(id);
    }
  }
};
</script>

<style scoped lang="less">
@import "../common.less";

.body,
.post-column {
  height: 100%;
}
.post-column {
  width: 10em;
  border-right: solid 1px @grey-color;
  .btn-new-post {
    text-align: center;
    padding: 1em;
    border-bottom: solid 1px @grey-color;
    cursor: pointer;
  }

  .post-list {
    .post-item {
      padding: 1em;
      border-bottom: solid 1px @grey-color;
      cursor: pointer;

      .btn-delete-post {
        display: inline-block;
        font-size: 0.8em;
        padding: 0.3em 0.5em;
        background-color: #f05458;
        color: #fff;
      }
    }
  }
}
</style>
