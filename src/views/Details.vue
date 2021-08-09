<template>
  <div class="wrapper-rooms">
    <div class="wrapper-content">
      <router-link to="/rooms" class="btn btn-primary">Go back</router-link>
      <h1 class="mb-4 text-center text-white">Room #{{ id }} Details</h1>

      <h2 class="mb-4 text-white">User Voted</h2>

      <div v-if="getDetails && request_response.request_error !== true">
        <users-component
          v-for="user in getDetails.users"
          :key="user.id"
          :id="user.user_id"
          :name="user.user_name"
          :value="user.vote_value"
        ></users-component>
        <details-component
          name="Avg Votes"
          :value="getDetails.avg_votes"
        ></details-component>
        <details-component
          name="Number Users Voted"
          :value="getDetails.n_users"
        ></details-component>
      </div>

      <alert-component
        v-if="request_response.request_error"
        :response-message="request_response.request_msg"
        :alert-role="request_response.alert_role"
        :alert-error-msg="request_response.alert_error_msg"
        :alert-class="request_response.alert_class"
      ></alert-component>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import UsersComponent from '../components/UsersComponent';
import DetailsComponent from '../components/DetailsComponent';
import AlertComponent from '../components/AlertComponent.vue';

export default {
  components: {
    UsersComponent,
    DetailsComponent,
    AlertComponent,
  },
  data() {
    return {
      id: 0,
      request_response: {},
    };
  },

  methods: {
    showAlertError(reqE, reqM, aleRol, aleErr, aleClass) {
      this.request_response = {
        request_error: reqE,
        request_msg: reqM,
        alert_role: aleRol,
        alert_error_msg: aleErr,
        alert_class: aleClass,
      };
    },
  },

  computed: {
    ...mapGetters('room', ['getDetails']),
  },

  async beforeCreate() {
    const id = await this.$route.params.roomId;
    this.id = id;
    try {
      const result = await this.$store.dispatch('room/getDetails', {
        room_id: id,
      });

      if (typeof result === 'string')
        this.showAlertError(
          true,
          result,
          'alert',
          'Not Found!',
          'alert-danger'
        );
    } catch (error) {
      this.showAlertError(
        true,
        'please contact the administrator',
        'alert',
        'Fatal Error!',
        'alert-danger'
      );
    }
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
