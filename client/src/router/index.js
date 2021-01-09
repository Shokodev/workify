import Vue from 'vue'
import Router from 'vue-router'
import Datatable from "../components/Datatable";
import Settings from "../components/Settings";
import Signup from "../components/Signup";
import Signin from "../components/Signin";
import UserAdministration from "../components/UserAdministration";
import PermissionDenied from "../components/pages/PermissionDenied";
import store from "../store"

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior: (to, from, savedPosition) => {
        if (to.hash) return { selector: to.hash }
        if (savedPosition) return savedPosition

        return { x: 0, y: 0 }
    },
    routes: [{
            path: '/',
            component: () =>
                import ('@/components/Dashboard.vue'),
            redirect: '/dashboard'
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: () =>
                import ('@/components/Dashboard.vue'),
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
        {
            path: '/signup',
            name: 'signup',
            component: Signup,
        },
        {
            path: '/signin',
            name: 'signin',
            component: Signin,
        },
        {
            path: '/permissionDenied',
            name: 'permissionDenied',
            component: PermissionDenied,
        },
        {
            path: '/userAdministration',
            component: UserAdministration,
            beforeEnter(to, from, next) {
                if (isAdmin()) {
                    next();
                } else {
                    next('/permissionDenied')
                }
            }
        }
    ]
})

function isAdmin() {
    if (store.state.user.role === "Admin") {
        return true;
    } else {
        return false;
    }

}

export const routes = [


];

export default router