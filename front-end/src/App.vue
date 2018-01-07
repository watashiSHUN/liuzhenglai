<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang="less">
@import "common.less";

* {
  margin: 0;
  padding: 0;
}

html,
body,
#app,
.page {
  height: 100%;
}

body {
  font-family: "Microsoft Yahei", sans-serif;
  background: #f0f3f5;
}

input,
textarea,
select,
button {
  font-family: inherit;
  outline: 0;
}

ul {
  list-style: none;
}

.item-list {
  .item {
    &:extend(.card);
    margin-bottom: 1em;
  }
}

.container {
  &:extend(.clearfix all);
  margin-left: auto;
  margin-right: auto;
}

@media (min-width: 650px) {
  .container {
    max-width: 650px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 675px;
  }
}

@media (min-width: 850px) {
  .container {
    max-width: 700px;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 850px;
  }
}
</style>
