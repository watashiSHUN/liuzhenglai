<template>
    <div class="settings-page page">
        <site-header></site-header>
        <div class="body">
            <div class="container">
                <label>
                    <div class="label">Profile Picture</div>
                    <img class="avatar" :src="globalState.user.avatar" />
                    <label class="btn btn-primary file-chooser">
                        Upload New Picture
                        <input type="file" accept=".jpg, .jpeg, .png" @change="uploadAvatar">
                    </label>
                </label>
                <label>
                    <div class="label">Name</div>
                    <input type="text" v-model="globalState.user.name" />
                </label>
                <label>
                    <div class="label">Email</div>
                    <input type="email" v-model="globalState.user.email" />
                </label>
                <button class="btn btn-primary btn-block" @click="updateProfile">Update Profile</button>
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
  mounted() {},
  methods: {
    updateProfile() {},
    uploadAvatar(e) {
      service.uploadAvatar(e.target.files[0]);
    }
  }
};
</script>

<style scoped lang="less">
@import "../less/common.less";
img.avatar {
  width: 5em;
  height: 5em;
}
.file-chooser {
  position: relative;
  input[type="file"] {
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    visibility: hidden;
  }
}
</style>
