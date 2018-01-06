import axios from 'axios'

const backendUrl = '/api'

function post(url, params) {
    return axios.post(backendUrl + url, { params: params })
}

export default {
    getPosts() {
        return post('/posts')
            .then(res => res.data)
    },
    newPost() {
        return post('/new_post')
            .then(res => {
                let post = res.data
                store.newPost(post)
                return post
            })
    },
    deletePost(postId) {
        return post('/delete_post', { postId: postId })
        .then(res => {
            let post = res.data
            store.deletePost(post.id)
            return post
        })
    }
}
