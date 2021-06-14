import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading : false,
    user:null,
    userToken: null,
  },
  mutations: {
    setLoading(state,payload) {
      state.isLoading = payload || !state.isLoading
    },
    setUser(state,user) {
      state.user = user;
    },
    setUserToken(state,token){
      state.userToken = token
    }
  },
  actions: {


  },
  modules: {},
});
