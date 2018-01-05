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

<style>
* {
  margin: 0;
  padding: 0;
}

body {
  font-family: "Microsoft Yahei", sans-serif;
  background: #aaa;
}

.container {
  margin-left: auto;
  margin-right: auto;
}
@media (min-width: 1024px) {
  .container {
    max-width: 850px;
  }
}
</style>
