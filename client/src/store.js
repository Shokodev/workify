import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router/index'

Vue.use(Vuex)

export default  new Vuex.Store({
    state: {
        idToken: null,
        localId: null,
        user: {
            nickname: "",
            username: "",
            role: "",
        }
    },

    mutations: {
        authUser (state, data){
             state.idToken = data.accessToken;
             state.localId = data.user[0]._id
             state.user.nickname = data.user[0].nickname;
             state.user.username = data.user[0].username;
             state.user.role = data.user[0].role;
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

       async login ({commit}, authData) {
           await axios.post('api/auth/login',
                authData
            )
                .then(res => {
                    localStorage.setItem('token', res.data.accessToken)
                    localStorage.setItem('userId', res.data.user[0]._id)
                    commit('authUser', res.data)
                });
            await router.replace('/');
        },
    },
    getters: {
    }
})
