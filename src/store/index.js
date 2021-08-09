import Vue from 'vue';
import Vuex from 'vuex';

import rootActions from './actions';
import rootGetters from './getters';
import rootMutations from './mutations';
import roomsIndex from './modules/rooms/index';
import roomIndex from './modules/room/index';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    rooms: roomsIndex,
    room: roomIndex,
  },

  state: {
    token: null,
    user: null,
    token_expiration: null,
  },

  actions: rootActions,
  mutations: rootMutations,
  getters: rootGetters,
});
