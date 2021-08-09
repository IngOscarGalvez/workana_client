import clientAxios from '../../../config/axios';

export default {
  async getRooms(context, _) {
    try {
      const result = await clientAxios.get('room');
      await context.commit('setRooms', result.data.result);
    } catch (error) {
      
      return error;
    }
  },
};
