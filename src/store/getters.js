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
};
