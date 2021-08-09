<template>
  <div class="wrapper-room">
    <alert-component
      v-if="request_response.request_error"
      :response-message="request_response.request_msg"
      :alert-role="request_response.alert_role"
      :alert-error-msg="request_response.alert_error_msg"
      :alert-class="request_response.alert_class"
    ></alert-component>

    <div class="index-circle">{{ id }}</div>
    <div class="form-group" role="group">
      <p>
        <span><strong>Room Name:</strong> {{ name }}</span>
      </p>
    </div>
    <button
      class="btn btn-primary set-position-button-join"
      @click="joinMe(id)"
      v-if="showJoinMeButton(id)"
    >
      Join me
    </button>
    <button
      class="btn btn-danger set-position-button-details"
      @click="getDetails(id)"
    >
      Details
    </button>
  </div>
</template>

<script>
import AlertComponent from './AlertComponent.vue';
export default {
  components: {
    AlertComponent,
  },

  props: {
    name: {
      type: String,
      required: true,
      description: 'room name',
    },
    id: {
      type: Number,
      required: true,
      description: 'room id',
    },
  },

  data() {
    return {
      request_response: {},
    };
  },

  methods: {
    getGame(id) {
      this.$router.push({
        name: 'room',
        params: { roomId: id },
      });
    },

    getDetails(id) {
      this.$router.push({
        name: 'Details',
        params: { roomId: id },
      });
    },

    async joinMe(id) {
      try {
        const result = await this.$store.dispatch('room/joinMe', {
          room_id: id,
        });

        if (typeof result === 'string') {
          this.showAlertError(
            true,
            result,
            'alert',
            'Impossible to Join!',
            'alert-info'
          );
        } else {
          this.getGame(id);
        }
      } catch (error) {        
        this.showAlertError(
          true,
          'please contact the administrator.',
          'alert',
          'Fatal Error!',
          'alert-danger'
        );
      }
    },

    showJoinMeButton: function(id) {
      const joined_to = JSON.parse(localStorage.getItem('joined_to'));
      if (!joined_to) {
        return true;
      }
      if (joined_to.includes(id)) {
        return false;
      } else return true;
    },

    showAlertError(reqE, reqM, aleRol, aleErr, aleClass) {
      this.request_response = {
        request_error: reqE,
        request_msg: reqM,
        alert_role: aleRol,
        alert_error_msg: aleErr,
        alert_class: aleClass,
      };
      setTimeout(() => {
        this.request_response['request_error'] = false;
      }, 4000);
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper-room {
  width: 100%;
  background-image: linear-gradient(-20deg, #00cdac 0%, #8ddad5 100%);
  margin: 1rem auto;
  padding: 0.7rem;
  border-radius: 5px;
  cursor: pointer;
  transform: scale(0.92);
  transition: transform 300ms ease-out, background-image 300ms ease-out,
    color 300ms ease-in;

  div {
    p {
      display: flex;
      justify-content: start;
      align-items: center;
      height: 100%;
      margin: 0;
    }
  }
}

.wrapper-room:hover {
  transform: scale(1);
}

.index-circle {
  width: 50px;
  height: 50px;
  left: -60px;
  top: 0px;
  border-radius: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  background-image: linear-gradient(to right, #243949 0%, #517fa4 100%);
  font-weight: bold;
  transition: all 300ms ease-out;
}

.wrapper-room:hover .index-circle {
  transform: scale(0.9);
}

.set-position-button-join {
  width: 100px;
  height: 50px;
  right: -110px;
  top: 0px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
  font-weight: bold;
  transition: all 300ms ease-out;
  transform: scale(0.82);
}

.set-position-button-details {
  width: 100px;
  height: 50px;
  right: -200px;
  top: 0px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  background-image: linear-gradient(to right, #fe4f66 0%, #fe009d 100%);
  font-weight: bold;
  transition: all 300ms ease-out;
  transform: scale(0.82);
}

.set-position-button-join:hover {
  transform: scale(1);
}
</style>
