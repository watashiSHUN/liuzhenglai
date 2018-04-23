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
@import "less/common.less";

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
#app,
.page {
  height: 100%;
}

input,
textarea,
select,
button,
.btn {
  font-family: inherit;
  outline: 0;
  transition: box-shadow @anim-duration-short ease-in-out;
  &:focus {
    box-shadow: 0 0 0 @space-xs var(--focus-box-shadow-color);
  }
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
