export default {
  setNewUser(state, payload) {
    state.joined_to.push(payload.room_id);
    let joined_to = JSON.parse(localStorage.getItem('joined_to'));

    if (!joined_to) {
      localStorage.setItem('joined_to', JSON.stringify(state.joined_to));
    } else {
      joined_to.push(payload.room_id);
      localStorage.setItem('joined_to', JSON.stringify(joined_to));
    }
  },

  setRoomUsers(state, payload) {
    state.room_users = payload;
  },

  setVote(state, payload) {
    const { id } = JSON.parse(localStorage.getItem('user'));
    state.room_users = state.room_users.filter((user) => {
      if (user.id == id) {
        user.pivot = {
          ...user.pivot,
          vote_value: payload.vote,
          voted: true,
        };
        return user;
      } else return user;
    });
  },

  setUserVotes(state, payload) {
    state.userVotes = payload;
  },

  setVoteResponse(state, payload) {
    state.voteResponse = payload.message;
  },
};
