import Vue from 'vue'
import Router from 'vue-router'
import login from '@/page/login'
import register from '@/page/register'
import index from '@/page/business/index'
import write from '@/page/business/write'
import popup from '@/page/other/popup'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/register',
            name: 'register',
            component: register
        },
        {
            path: '/index',
            name: 'index',
            component: index
        },
        {
            path: '/write',
            name: 'write',
            component: write
        },


        {
            path: '/popup',
            name: 'popup',
            component: popup
        }
    ]
})
