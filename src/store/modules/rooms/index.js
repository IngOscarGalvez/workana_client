import roomsActions from './actions';
import roomsMutations from './mutations';
import roomsGetters from './getters';

export default {
  namespaced: true,
  state() {
    return {
      rooms: [],
    };
  },

  actions: roomsActions,
  mutations: roomsMutations,
  getters: roomsGetters,
};
