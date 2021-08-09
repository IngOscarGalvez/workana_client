export default {
  authUser(state, payload) {   
    state.user = payload.user;
    state.token = payload.access_token;
    state.token_expiration = payload.expires_in;

    localStorage.setItem('token', JSON.stringify(payload.access_token));
    localStorage.setItem('user', JSON.stringify(payload.user));
    localStorage.setItem(
      'token_expiration',
      JSON.stringify(payload.expires_in)
    );
  },

  clearSessionData(state, _) {
    state.token = null;
    state.user = null;
    state.token_expiration = null;
    state.joined_to = null;

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('token_expiration');
    localStorage.removeItem('joined_to');
  },
};
