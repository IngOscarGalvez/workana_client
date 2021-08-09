import clientAxions from '../config/axios';

export default {
  async login(context, payload) {
    try {
      let response = await clientAxions.post('auth/login', payload);      
      context.commit('authUser', response.data.result);
      context.dispatch('autoLogout', response.data.result);
      return true;
    } catch (error) {
      let response_error = '';
      if (typeof error.response.data.msg == 'object') {
        let key = Object.keys(error.response.data.msg)[0];
        let concat_erros = error.response.data.msg[key].join(' ');
        response_error = concat_erros;
      } else {
        response_error = error.response.data.msg;
      }
      return response_error;
    }
  },

  autoLogout(context, _) {
    const expire_at = JSON.parse(localStorage.getItem('token_expiration'));
    const revoke_token = expire_at * 1000;
    setTimeout(function() {
      context.dispatch('logout');
    }, revoke_token);
  },

  async logout(context, _) {
    try {
      await context.dispatch('clearSessionData');
      await clientAxions.post('auth/revokeToken');
      window.location.reload();
    } catch (error) {
      return error.message;
    }
  },

  getToken(_, __) {
    const token = JSON.parse(localStorage.getItem('token'));
    return token.accessToken ? token.accessToken : null;
  },

  async clearSessionData(context, _) {
    await context.commit('clearSessionData');
  },

  async register(context, payload) {
    try {
      await clientAxions.post('auth/register', payload);
      const data_to_auto_login = {
        email: payload.email,
        password: payload.password,
      };
      await context.dispatch('login', data_to_auto_login);
      return true;
    } catch (error) {
      let key = Object.keys(error.response.data.msg)[0];
      let errors = error.response.data.msg[key].join(' ');
      return errors;
    }
  },
};
