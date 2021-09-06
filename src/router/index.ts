import { createRouter, createWebHashHistory } from 'vue-router'
import { ComponentOptions }  from 'vue'

export interface routerConfig {
    path: string,
    name: string,
    component: ComponentOptions,
    children?: Array<routerConfig>
}

//登录页
import login from '../page/sys/login/index.vue'

//新建博客
import newBlog from '../page/main/newBlog/index.vue'

import page404 from '../page/main/exception/404/index.vue'



export const routerList: Array<routerConfig> = [
    {
        path: '/',
        name: 'login',
        component: login
    },
    {
        path: '/newBlog',
        name: 'newBlog',
        component: newBlog
    },
    {
        path: '/404',
        name: 'global404',
        component: page404
    }
]


export const router = createRouter({
    history: createWebHashHistory(),
    routes: routerList
})
