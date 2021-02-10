import VueRouter from 'vue-router'
import Vue from 'vue'
import Layout from '../pages/layout'

Vue.use(VueRouter)
export const defaultRouters = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '',
        component: Layout,
        redirect: '/home',
        children: [
            {
                path: '/home',
                component: () => import('@/pages/home'),
            },
            {
                path: '/cate',
                component: () => import('@/pages/cate'),
            },
            {
                path: '/shopcar',
                component: () => import('@/pages/shopcar'),
            },
            {
                path: '/mine',
                component: () => import('@/pages/mine'),
            },
        ]

    },
    {
        path: '/product/:id',
        component: () => import('@/pages/product/detail'),
    },
    {
        path: '/login',
        component: () => import('@/pages/auth/login'),
    },
    {
        path: '/404',
        component: () => import('@/pages/404'),
    },
]

export default new VueRouter({
    routes: defaultRouters,
})
