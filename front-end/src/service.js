import axios from 'axios';

const backendApiUrl = '/api';

function sendPost(url, params, config) {
    return axios.post(backendApiUrl + url, params, config);
}

function authPost(url, params, _config) {
    let config = Object.assign({ headers: {} }, _config);
    config.headers.Authorization = 'Bearer ' + localStorage.getJson('token');
    return axios.post(backendApiUrl + url, params, config);
}

function updateToken(res) {
    store.updateToken(res.data.token);
}

export default {
    getPosts(userId) {
        return sendPost('/posts', { userId })
            .then(res => res.data);
    },
    getPost(postId) {
        return sendPost('/post', { postId })
            .then(res => res.data);
    },
    newPost() {
        return authPost('/new-post')
            .then(res => {
                let post = res.data;
                store.newPost(post);
                return post;
            });
    },
    deletePost(postId) {
        return authPost('/delete-post', { postId })
            .then(res => {
                store.deletePost(postId);
            });
    },
    updatePost(post) {
        return authPost('/update-post', { post });
    },
    signIn(email, password) {
        return sendPost('/sign-in', { email, password }).then(updateToken);
    },
    signUp(email, password) {
        return sendPost('/sign-up', { email, password }).then(updateToken);
    },
    uploadAvatar(avatar) {
        let data = new FormData();
        data.append('avatar', avatar);
        return authPost('/upload-avatar', data, {
            headers: { 'content-type': 'multipart/form-data' }
        })
        .then(updateToken);
    },
    updateProfile() {
        return authPost('/update-profile', { name: store.state.user.name }).then(updateToken);
    }
}
