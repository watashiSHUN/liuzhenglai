import axios from 'axios';

const backendUrl = '/api';

function sendPost(url, params) {
    return axios.post(backendUrl + url, { params });
}

export default {
    getPosts() {
        return sendPost('/posts')
            .then(res => res.data);
    },
    newPost() {
        return sendPost('/new-post')
            .then(res => {
                let post = res.data;
                store.newPost(post);
                return post;
            });
    },
    deletePost(postId) {
        return sendPost('/delete-post', { postId })
            .then(res => {
                let post = res.data;
                store.deletePost(post.id);
                return post;
            });
    },
    updatePost(post) {
        return sendPost('/update-post', { post });
    },
    logIn(email, password) {
        return sendPost('/login', { email, password }).then((res) => {
            store.setUser({ token: res.data });
        });
    },
    signUp(email, password) {
        return sendPost('/sign-up', { email, password }).then((res) => {
            store.setUser({ token: res.data });
        });
    }
}
