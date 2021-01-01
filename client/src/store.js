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
        localId: null,
        user: null,
        role: null,
        posts: null,
        users: null,
        progressData: null,
    },

    mutations: {
        authUser(state, data) {
            state.idToken = data.accessToken;
            state.localId = data.user[0]._id
            state.role = data.user[0].role;
            state.user = data.user[0];
        },
        storeUser(state, user) {
            state.idToken = user.idToken;
            state.userId = user.userId;
            state.role = user.role;
        },
        clearAuthData(state) {
            state.idToken = null
            state.localId = null
            state.role = null
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
                commit('clearAuthData')
            }, expirationTime * 1000)
            router.replace('/signin')
        },
        signup({ dispatch }, authData) {
            axios.post('api/users/register',
                    authData
                )
                .then(() => {
                    console.log(authData);
                    dispatch('login', authData)
                })
                .catch(error => console.log(error))
        },

        signin({ commit, dispatch }, authData) {
            return new Promise(((resolve, reject) => {
                console.log(authData)
                axios.post('api/auth/login',
                        authData
                    ).then(res => {
                        const now = new Date()
                        const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
                        localStorage.setItem('expirationDate', expirationDate.toString())
                        localStorage.setItem('token', res.data.accessToken)
                        localStorage.setItem('userId', res.data.user[0]._id)
                        localStorage.setItem('role', res.data.user[0].role)
                        console.log(res.data)
                        commit('authUser', res.data)
                        console.log(res.data)
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
            console.log(now)
            console.log(new Date(expirationDate))
            if (now >= new Date(expirationDate)) {
                return
            }
            const userId = localStorage.getItem('userId')
            commit('storeUser', {
                idToken: idToken,
                userId: userId,
                role: localStorage.getItem('role')
            })
        },

        logout({ commit }) {
            commit('clearAuthData')
            localStorage.removeItem('expirationDate')
            localStorage.removeItem('token')
            localStorage.removeItem('userId')
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
            return state.role
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