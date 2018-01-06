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
* {
  margin: 0;
  padding: 0;
}

body {
  font-family: "Microsoft Yahei", sans-serif;
  background: #f0f3f5;
}

.clearfix:after {
  content: "";
  display: table;
  clear: both;
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
