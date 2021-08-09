export default {
  getRooms(state) {
    return state.rooms.length > 0 ? state.rooms : [];
  },
};
