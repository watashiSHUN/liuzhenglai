<template>
  <div class="home">
    <div class="header">
      <div class="container">
        <div class="site-title">Liu Zhenglai</div>
        <div class="nav">
          <a class="nav-item active">Post</a>
        </div>
      </div>
    </div>
    <div class="body">
      <div class="container">
        <ul class=" post-list item-list">
          <li v-for="post in globalState.posts" :key="post.id" class="item">
            <a class="post-link">
              <div class="post-title">
                {{ post.title }}
              </div>
            </a>
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
  }
};
</script>

<style scoped lang="less">
@import "../common.less";

.header {
  background-color: #fff;
  .site-title,
  .nav {
    line-height: 3em;
  }
  .site-title {
    float: left;
    cursor: pointer;
  }
  .nav {
    float: right;
    a.nav-item {
      color: #333;
      text-decoration: none;
      padding: 0 1em;
      display: inline-block;
      cursor: pointer;
      transition: background-color 0.15s ease-in-out;

      &.active,
      &.active:hover {
        background-color: @brand-color;
        color: #fff;
      }

      &:hover {
        background-color: #ddd;
      }
    }
  }
}

.body {
  padding-top: 1em;
}

.post-list {
  > li.item {
    padding: 0;
    -webkit-transition: box-shadow 0.2s ease-in-out;
    transition: box-shadow 0.2s ease-in-out;

    &:hover {
      box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.06);
    }

    .post-link {
      display: block;
      position: relative;
      text-decoration: none;
      color: @text-color;

      &:hover .post-title {
        color: @brand-color;
      }
    }

    .post-title {
      font-size: 1.5em;
      text-align: center;
      padding: @spacing-unit;
      border-bottom: 1px solid @grey-color-light;
      -webkit-transition: color 0.2s ease-in-out;
      transition: color 0.2s ease-in-out;
    }

    .post-excerpt {
      font-size: 0.8em;
      padding: @spacing-unit;
    }

    .post-meta {
      position: absolute;
      top: 0;
      right: 0;
      font-size: @small-font-size;
      color: @grey-color;
      padding: 0.3em 1em;
      box-shadow: inset 0 -1px 2px @grey-color-light;
      border-top-right-radius: @default-border-radius;
      border-bottom-left-radius: @default-border-radius;
    }

    .post-read-more {
      color: @brand-color;
      text-decoration: underline;

      &:hover {
        text-decoration: none;
      }
    }
  }
}
</style>
