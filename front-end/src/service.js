import axios from 'axios';

const backendUrl = '/api';

function sendPost(url, params) {
    return axios.post(backendUrl + url, params);
}

function authPost(url, params) {
    return axios.post(backendUrl + url, params, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getJson('token')
        }
    });
}

export default {
    getPosts() {
        return authPost('/posts')
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
    logIn(email, password) {
        return sendPost('/login', { email, password }).then((res) => {
            localStorage.setJson('token', res.data.token);
        });
    },
    signUp(email, password) {
        return sendPost('/sign-up', { email, password }).then((res) => {
            localStorage.setJson('token', res.data.token);
        });
    }
}
