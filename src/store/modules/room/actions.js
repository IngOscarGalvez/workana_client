import clientAxions from '../../../config/axios';

export default {
  async joinMe(context, payload) {
    try {
      const user = await JSON.parse(localStorage.getItem('user'));
      if (!user) {
        throw new Error('The user does not exist.');
      }

      const data_to_send = {
        room_id: payload.room_id,
        user_id: user.id,
      };
      const result = await clientAxions.post('joinMe', data_to_send);

      context.commit('setNewUser', result.data.result);
      return true;
    } catch (error) {
      const errors = await context.dispatch('getErros', error.response);
      return errors;
    }
  },

  async getDetails(context, payload) {    
    try {
      const result = await clientAxions.get(
        `UserRoomVote?room_id=${payload.room_id}`
      );

      await context.commit('setUserVotes', result.data.result);
      return true;
    } catch (error) {
      const errors = await context.dispatch('getErros', error.response);
      return errors;
    }
  },

  async getRoomUsers(context, payload) {
    try {
      const result = await clientAxions.get(`room/${payload.id}`);      
      context.commit('setRoomUsers', result.data.result);
    } catch (error) {
      const errors = await context.dispatch('getErros', error.response);
      return errors;
    }
  },

  async setVote(context, payload) {
    try {
      await context.commit('setVote', payload);
      console.log('setVote',payload);
      const userAutheticated = await context.dispatch('getUserAuthenticated');

      const result = await context.dispatch('sendVote', userAutheticated);
      return result;
    } catch (error) {
      return error;
    }
  },

  async getUserAuthenticated(context, __) {
    const { id } = await JSON.parse(localStorage.getItem('user'));
    return await context.state.room_users.find((user) => user.id == id);
  },

  async sendVote(context, payload) {
    try {
      const result = await clientAxions.post('giveVote', payload.pivot);
      console.log('sendVote',result);
      context.commit('setVoteResponse', result.data.result);
      return true;
    } catch (error) {
      const errors = await context.dispatch('getErros', error.response);
      return errors;
    }
  },

  async getErros(_, payload) {
    let key = Object.keys(payload.data.msg)[0];
    let errors = payload.data.msg[key].join(' ');
    return errors;
  },
};
