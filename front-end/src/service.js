import axios from 'axios'

const backendUrl = '/api'

function sendPost(url, params) {
    return axios.post(backendUrl + url, { params })
}

export default {
    getPosts() {
        return sendPost('/posts')
            .then(res => res.data)
    },
    newPost() {
        return sendPost('/new_post')
            .then(res => {
                let post = res.data
                store.newPost(post)
                return post
            })
    },
    deletePost(postId) {
        return sendPost('/delete_post', { postId })
        .then(res => {
            let post = res.data
            store.deletePost(post.id)
            return post
        })
    },
    updatePost(post) {
        return sendPost('/update_post', { post })
    },
    logIn(username, password) {
        return sendPost('/login', { username, password }).then((res)=> {
            store.setUser({ token: res.data });
        });
    }
}
