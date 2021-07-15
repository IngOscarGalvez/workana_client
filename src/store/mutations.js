export default {
    authUser(state, payload) {
        state.user = payload.user;
        state.token = payload.access_token;
        state.token_expiration = payload.expiratin_token_in_seconds;

        localStorage.setItem('token', JSON.stringify(payload.access_token));
        localStorage.setItem('user', JSON.stringify(payload.user));
        localStorage.setItem('token_expiration', JSON.stringify(payload.token_expiration_in_seconds));
    },

    clearSessionData(state, _) {
        state.token = null;
        state.user = null;
        state.token_expiration = null;
        state.joined_to = null;

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("token_expiration");
        localStorage.removeItem("joined_to");
    },

    setRooms(state, payload) {
        state.rooms = payload;
    },

    setRoomUsers(state, payload) {
        state.room_users = payload;
    },

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
    setVote(state, payload) {
        const { id } = JSON.parse(localStorage.getItem('user'));
        state.room_users = state.room_users.filter(user => {
            if (user.id == id) {
                user.pivot = {
                    ...user.pivot,
                    vote_value: payload.vote,
                    voted: true
                }
                return user;
            } else return user;
        });
    },

    setVoteResponse(state, payload) {
        state.voteResponse = payload.message;
    },
    setUserVotes(state, payload) {
        console.log(payload);
        state.userVotes = payload;
    },
}