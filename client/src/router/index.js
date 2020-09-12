import Vue from 'vue'
import Router from 'vue-router'
import Datatable from "../components/Datatable";
import Settings from "../components/Settings";

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior: (to, from, savedPosition) => {
        if (to.hash) return { selector: to.hash }
        if (savedPosition) return savedPosition

        return { x: 0, y: 0 }
    },
    routes: [
        {
            path: '/',
            component: () => import('@/components/Dashboard.vue'),
            redirect: '/dashboard'
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: () => import('@/components/Dashboard.vue'),
        },
        {
            path: '/datatable',
            name: 'datatable',
            component: Datatable,
        },
        {
            path: '/settings',
            name: 'settings',
            component: Settings,
        },
    ]


})


export const routes = [


];

export default router