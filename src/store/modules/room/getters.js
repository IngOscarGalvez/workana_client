export default {
  getDetails(state) {
    return state.userVotes ? state.userVotes : false;
  },

  getVoteRes(state) {
    return state.voteResponse ? state.voteResponse : 'Unanswered!';
  },

  getRoomUsers(state) {
    return state.room_users.length > 0 ? state.room_users : [];
  },
};
