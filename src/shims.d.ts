declare module '*.vue' {
    import { ComponentOptions } from 'vue'
    const componentOptions: ComponentOptions
    export default componentOptions
}


declare interface response<T> {
    code: number,
    data: T,
    message: string
    note: string
}

interface requestPost<T, S> {
    (url: string, data: T): Promise<response<S>>
}

interface requestGet<T> {
    (url: string): Promise<response<T>>
}

declare interface axiosConfig<T, S> {
    post: requestPost<T, S>,
    get: requestGet<T>
}

interface Window {
    $axios: any
    $message: any
    pdfjsLib: any
    printJS: any
}


interface Document {
    fullScreen: any
    mozFullScreen: any
    webkitIsFullScreen: any
    mozCancelFullScreen: any
    webkitExitFullscreen: any
}

interface Token {
    access_token: string
    token_type: string
}

declare module '@bundled-es-modules/axios'

declare type Size = "small" | "medium" | "large"