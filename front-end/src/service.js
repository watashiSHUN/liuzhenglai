import axios from 'axios'

const backendUrl = '/api'

function post(url, params) {
    return axios.post(backendUrl + url, { params: params })
}

export default {
    getPosts() {
        return post('/posts')
            .then(res => res.data)
    }
}
