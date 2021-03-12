import VueRouter from 'vue-router'
import Vue from 'vue'
import Layout from 'pages/layout'

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
                name:'home',
                component: () => import('@/pages/home'),
                meta: {keepAlive: true}
            },
            {
                path: '/cate',
                component: () => import('@/pages/cate'),
                meta: {keepAlive: true}

            },
            {
                path: '/shopcar',
                component: () => import('@/pages/shopcar'),
                meta: {keepAlive: true}

            },
            {
                path: '/mine',
                component: () => import('@/pages/mine'),
                meta: {keepAlive: true}

            },
        ]

    },
    {
        path: '/product/:id',
        component: () => import('@/pages/product/detail'),
        meta: {keepAlive: false}

    },
    {
        path: '/search',
        component: () => import('@/pages/search'),
        meta: {keepAlive: false}

    },
    {
        path: '/order/confirm',
        component: () => import('@/pages/order/confirm'),
        meta: {keepAlive: false}

    },
    {
        path: '/login',
        name:'login',
        component: () => import('pages/auth/login'),
        meta: {keepAlive: true}
    },
    {
        path: '/404',
        component: () => import('pages/404'),
        meta: {keepAlive: true}
    },
]

export default new VueRouter({
    routes: defaultRouters,
})
