export default {
    async isAuthenticated(state) {
        const token = await JSON.parse(localStorage.getItem('token'));
        if (state.token) {
            return !!state.token;
        } else if (token) {
            return !!token;
        } else {
            return false;
        }
    },

    getRooms(state) {
        return state.rooms.length > 0 ? state.rooms : [];
    },

    getRoomUsers(state) {
        return state.room_users.length > 0 ? state.room_users : [];
    },

    getVoteRes(state) {
        return state.voteResponse ? state.voteResponse : 'Unanswered!';
    },

    getDetails(state) {
        return state.userVotes ? state.userVotes : [];
    }
}