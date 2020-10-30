import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
//import router from './router/index'

Vue.use(Vuex)

export default  new Vuex.Store({
    state: {
        idToken: null,
        localId: null,
        user: null
    },

    mutations: {
        authUser (state, userData){
            state.idToken = userData.token
            state.userId = userData.userid
        },
        storeUser (state, user) {
            state.user = user
        }
    },

    actions: {

        signup ({commit, dispatch}, authData) {
        axios.post('api/users/register', {
            authData
        })
            .then(res => {
                console.log(res)
                commit('authUser', {
                    token: res.data.idToken,
                    userId: res.data.localId
                })
                localStorage.setItem('token', res.data.idToken)
                localStorage.setItem('userId', res.data.userId)
                dispatch('storeUser', authData)
            })
            .catch(error => console.log(error))
        },

        login ({commit}, authData) {
            axios.post('api/users/login', {
                authData
            })
                .then(res => {
                    localStorage.setItem('token', res.data.idToken)
                    localStorage.setItem('userId', res.data.localId)
                    commit('authUser', {
                        token: res.data.idToken,
                        userId: res.data.userId
                    })
                })
        }
    },
    getters: {
    }
})