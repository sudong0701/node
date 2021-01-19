import axios from 'axios'
import router from '@/router'
import Vue from 'vue'

axios.defaults.headers.post['Content-Type'] = 'application/json'

// http request 拦截器
axios.interceptors.request.use(
    config => {
        const token = sessionStorage.getItem('token')
        if (token ) { // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.authorization = token  //请求头加上token
        }
        return config
    },
    err => {
        return Promise.reject(err)
    })


//请求返回拦截
axios.interceptors.response.use(
    response => {
        const result = response.data
        if (result.code === 200) {
            return result
        } else if ((result.code === 203)) {
            router.push({path: '/login'})
            return result
        } else {
            return result
        }
    },
    error => {
        console.log(error)
        if (error.response) {
            Vue.prototype.$toast.default({
                content: '服务器错误'
            })
        }
        return error.response.data
    }
)

export default axios
