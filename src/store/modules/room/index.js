import roomActions from './actions';
import roomMutations from './mutations';
import roomGetters from './getters';

export default {
  namespaced: true,
  state() {
    return {
      joined_to: [],
      userVotes: {},
      voteResponse: '',
      room_users: [],
    };
  },

  actions: roomActions,
  mutations: roomMutations,
  getters: roomGetters,
};
