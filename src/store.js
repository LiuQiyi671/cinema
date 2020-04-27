import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        userid: null,
        islogin: false,

    },

    modules: {

    },

    mutations:{
        Userid(state,payload){
            state.userid = payload.userid;
        },

        Islogin(state){
            state.islogin = !state.islogin;
        },


    },
    getters:{

        getUserId(state){
            return state.userid;
        },

        getIsLogin(state){
            return state.islogin;
        },


    }
});