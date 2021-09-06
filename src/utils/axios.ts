


import { axios } from '@bundled-es-modules/axios'
import { router } from '../router'

//设置请求头
axios.defaults.headers.post['Content-Type'] = 'application/json'

//请求前拦截
axios.interceptors.request.use(
    (config: any) => {
        config.transformResponse = [(data: any) => {
            return JSON.parse(data)
        }]

        return config
    },
    (error: any) => {
        return error
    }
)

//请求返回拦截
axios.interceptors.response.use(
    (response: any) => {
        // IE 8-9
        if (response) {
            const result = response.data
            return result
        }

    },
    (error: any) => {
        if (error.response) {
            return error.response.data
        }
    }
)

enum responseCode {
    success = 200,
    tokenFailure = 201
}

interface paramsConfig<T> {
    url: string | unknown,
    data: T,
    isDefault?: boolean
}

interface responseConfig<T> {
    code: number,
    data: T,
    message: string
    note: string
}



export const requestApi = <requestDataConfig, responseDataConfig>(params: paramsConfig<requestDataConfig>): Promise<responseConfig<responseDataConfig>> => {
    return new Promise((resolve, reject) => {
        axios.post(params.url, params.data)
            .then((res: response<responseDataConfig>) => {
                
                if (res && res.code === responseCode.success) {
                    resolve(res)
                } else {
                    if (params.isDefault) {
                        router.push('/')
                    }
                    window.$message.error(res.message)
                    reject(res)
                }
            })
    })
}