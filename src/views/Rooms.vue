<template>
  <div class="wrapper-rooms">
    <div class="wrapper-content">
      <h1 class="mb-4 text-center text-white">Rooms</h1>
      <div v-if="getRooms.length > 0">
        <room-component
          v-for="room in getRooms"
          :key="room.id"
          :id="room.id"
          :name="room.name"
        ></room-component>
      </div>

      <alert-component
        v-else
        response-message="There are no rooms available at this time."
        alert-role="alert"
        alert-error-msg="Not Found!"
        alert-class="alert-info"
      ></alert-component>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import RoomComponent from '../components/RoomComponent';
import AlertComponent from '../components/AlertComponent';

export default {
  components: {
    RoomComponent,
    AlertComponent,
  },

  data() {
    return {};
  },

  computed: {
    ...mapGetters('rooms', ['getRooms']),
  },

  async beforeCreate() {
    await this.$store.dispatch('rooms/getRooms');
  },

  mounted() {
    this.$store.dispatch('autoLogout');
  },
};
</script>

<style lang="scss" scoped>
.wrapper-rooms {
  width: 100vw;
  height: 100vh;
  padding-top: 4rem;
  background-image: linear-gradient(60deg, #29323c 0%, #485563 100%);
  color: #fff;
}

.wrapper-content {
  position: relative;
  width: 50%;
  height: 80%;
  padding: 3rem 4rem;
  margin: 0 auto;
  border-radius: 10px;
}
</style>
