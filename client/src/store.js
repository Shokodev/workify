import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router/index'
/*import {error} from "winston";*/

Vue.use(Vuex)

export default  new Vuex.Store({
    state: {
        idToken: null,
        localId: null,
        user: null,
    },

    mutations: {
        authUser(state, data) {
            state.idToken = data.accessToken;
            state.localId = data.user[0]._id
            state.user = data.user[0];

        },
        storeUser (state, user) {
            state.user = user
        },
        clearAuthData(state) {
            state.idToken = null
            state.localId = null
        },
    },

    actions: {
        setLogoutTimer({commit}, expirationTime) {
            setTimeout(() => {
                commit('clearAuthData')
            }, expirationTime * 1000)
        },
        signup({dispatch}, authData) {
            axios.post('api/users/register',
                authData
            )
                .then(() => {
                    console.log(authData);
                    dispatch('login', authData)
                })
                .catch(error => console.log(error))
        },

        signin ({commit, dispatch}, authData) {
            return new Promise(((resolve, reject) => {
                console.log(authData)
                axios.post('api/auth/login',
                    authData
                )                .then(res => {
                    const now = new Date()
                    const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
                    localStorage.setItem('expirationDate', expirationDate.toString())
                    localStorage.setItem('token', res.data.accessToken)
                    localStorage.setItem('userId', res.data.user[0]._id)
                    console.log(res.data)
                    commit('authUser', res.data)
                    dispatch('setLogoutTimer', res.data.expiresIn)
                    router.replace('/datatable')
                })
                    .catch((error) => {
                        reject(error)
                    })
            }))
        },


/*        async login({commit, dispatch}, authData) {
            await axios.post('api/auth/login',
                authData
            )
                .then(res => {
                    const now = new Date()
                    const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
                    localStorage.setItem('expirationDate', expirationDate.toString())
                    localStorage.setItem('token', res.data.accessToken)
                    localStorage.setItem('userId', res.data.user[0]._id)
                    console.log(res.data)
                    commit('authUser', res.data)
                    dispatch('setLogoutTimer', res.data.expiresIn)
                    router.replace('/datatable')
                })
                .catch(error => console.log(error))

        },*/
        tryAutoLogin ({commit}) {
            const token = localStorage.getItem('token')
            if(!token) {
                return
            }
            const expirationDate = localStorage.getItem('expirationDate')
            const now = new Date()
            if (now >= expirationDate) {
                return
            }
            const userId = localStorage.getItem('userId')
            commit('authUser', {
                token: token,
                userId: userId
            })
        },

        logout({commit}) {
            commit('clearAuthData')
            localStorage.removeItem('expirationDate')
            localStorage.removeItem('token')
            localStorage.removeItem('userId')
            router.replace('/signin')
        },
    },
    getters: {
        user (state) {
            return state.user
        },
        isAuthenticated (state) {
            return state.idToken !== null
        },
    }
})
