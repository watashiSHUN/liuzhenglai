<template>
  <div class="settings-page page">
    <site-header></site-header>
    <div class="body">
      <div class="container flex-h">
        <div class="flex-grow">
          <label class="display-block form-group">
            <div class="title">Name</div>
            <input type="text" v-model="globalState.user.name" class="form-control" />
          </label>
          <label class="display-block form-group">
            <div class="title">Email</div>
            <input type="email" v-model="globalState.user.email" class="form-control" />
          </label>
          <button class="btn btn-primary display-block" @click="updateProfile">Update Profile</button>
        </div>
        <label class="flex-v upload-avatar">
          <div class="title">Profile Picture</div>
          <img class="avatar" :src="globalState.user.avatar" />
          <label class="btn btn-primary file-chooser">
            <span>
              Change Picture
            </span>
            <input type="file" accept=".jpg, .jpeg, .png" @change="uploadAvatar">
          </label>
        </label>

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
.container {
  padding: @space-md 0;
}

.upload-avatar {
  width: 10em;
  margin: 0 @space-lg;

  img.avatar {
    margin-bottom: @space-sm;
    width: 10em;
    height: 10em;
  }
  .file-chooser {
    position: relative;
    text-align: center;
    width: 100%;
    font-size: 0.8em;

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
}

label {
  .title {
    margin-bottom: @space-sm;
  }
}

.form-group {
  margin: @space-sm 0;
  .form-control {
    width: 25em;
    max-width: 100%;
  }
}
</style>
