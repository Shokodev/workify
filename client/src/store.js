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

        signup ({dispatch}, authData) {
        axios.post('api/users/register',
            authData
        )
            .then(() => {
                console.log(authData);
                dispatch('login',authData)
            })
            .catch(error => console.log(error))
        },

        login ({commit}, authData) {
            axios.post('api/auth/login',
                authData
            )
                .then(res => {
                    localStorage.setItem('token', res.data.accessToken)
                    localStorage.setItem('userId', res.data.user[0]._id)
                    commit('authUser', {
                        token: res.data.accessToken,
                        userId: res.data.user[0]._id
                    })
                })
        },
    },
    getters: {
    }
})
