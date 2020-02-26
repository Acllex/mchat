import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist';
import { seeUser } from "@/api/user";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage
});

export default new Vuex.Store({
  state: {
    user: null,
    historical:[],
    message: null,
  },
  mutations: {
    getUser(state, user) {
      state.user = user;
    },
    getHis(state, mess) {
      state.historical.push(mess);
    }
  },
  actions: {
    async getUser(context){
      let res = await seeUser();
      let {code, data} = res.data;
        if(code==200){
          context.commit('getUser', data);
        }
    },
    async getMess(context, data) {
      context.commit('getHis', data);
    }
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
