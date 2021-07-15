import Vue from 'vue'
import Vuex from 'vuex'

import rootActions from './actions';
import rootGetters from './getters';
import rootMutations from './mutations';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
  },
  state: {
    token: null,
    user: null,
    token_expiration: null,
    rooms: [],
    room_users: [],
    joined_to: [],
    voteResponse: '',
    userVotes:[]
  },

  actions: rootActions,
  mutations: rootMutations,
  getters: rootGetters
});
