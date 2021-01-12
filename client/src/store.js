import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router/index'
import PostService from './PostService'

/*import {error} from "winston";*/

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        idToken: null,
        user: {
            nickname: null,
            password: null,
            role: null,
            username: null,
        },
        posts: null,
        users: null,
        progressData: null,
    },

    mutations: {
        authUser(state, data) {
            state.idToken = data.accessToken;
            state.user = data.user[0];
        },
        storeUser(state, data) {
            state.idToken = data.idToken;
            state.user = data.user;
        },
        clearAuthData(state) {
            state.idToken = null;
            state.user = {
                nickname: null,
                role: null,
                username: null,
            }
        },
        setPosts(state, posts) {
            state.posts = posts;
        },
        setUsers(state, users) {
            state.users = users;
        },
        setProgressData(state, progressData) {
            state.progressData = progressData;
        },
    },

    actions: {
        setLogoutTimer({ commit }, expirationTime) {
            setTimeout(() => {
                commit('clearAuthData');
                router.replace('/signin');
            }, expirationTime * 1000)
        },
        signup({ dispatch }, authData) {
            axios.post('api/users/register',
                    authData
                )
                .then(() => {
                    dispatch('signin', authData)
                })
                .catch(error => console.log(error))
        },

        signin({ commit, dispatch }, authData) {
            return new Promise(((resolve, reject) => {
                axios.post('api/auth/login',
                        authData
                    ).then(res => {
                        const now = new Date()
                        const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
                        localStorage.setItem('expirationDate', expirationDate.toString())
                        localStorage.setItem('token', res.data.accessToken)
                        res.data.user[0].password = "";
                        localStorage.setItem('user', JSON.stringify(res.data.user[0]))
                        commit('authUser', res.data)
                        dispatch('setLogoutTimer', res.data.expiresIn)
                        router.replace('/datatable')
                    })
                    .catch((error) => {
                        reject(error)
                    })
            }))
        },
        tryAutoLogin({ commit }) {
            const idToken = localStorage.getItem('token')
            if (!idToken) {
                return
            }
            const expirationDate = localStorage.getItem('expirationDate')
            const now = new Date()
            if (now >= new Date(expirationDate)) {
                return
            }
            const user = JSON.parse(localStorage.getItem('user'));
            commit('storeUser', {
                idToken: idToken,
                user: user,
            })
        },

        logout({ commit }) {
            commit('clearAuthData')
            localStorage.removeItem('expirationDate')
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            router.replace('/signin')
        },
        async loadPosts({ commit }) {
            commit('setPosts', await PostService.getPosts())
        },

        async getUsers({ commit }) {
            PostService.getUsers().then(res => {
                commit('setUsers', res)
            }).catch(error => console.log(error));
        },

        async loadProgressData({ commit }) {
            await PostService.getDashboard("progress").then(res => {
                commit('setProgressData', res)
            }).catch(error => console.log(error));
        }
    },

    getters: {
        user(state) {
            return state.user
        },
        isAuthenticated(state) {
            return state.idToken !== null
        },
        userRole(state) {
            return state.user.role
        },
        getPosts(state) {
            return state.posts
        },
        getUsers(state) {
            return state.users
        },
        getProgressData(state) {
            return state.progressData
        }
    }
})