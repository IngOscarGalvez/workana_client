<template>
  <div id="container">
    <router-link to="/rooms" class="btn btn-primary">Go back</router-link>
    <alert-component
      v-if="request_response.request_error"
      :response-message="request_response.request_msg"
      :alert-role="request_response.alert_role"
      :alert-error-msg="request_response.alert_error_msg"
      :alert-class="request_response.alert_class"
    ></alert-component>

    <div class="vote" v-if="getRoomUsers">
      <ul id="voteList">
        <li
          v-for="(vote, index) in validVotes"
          :key="index"
          @click="giveVote(vote, $event)"
        >
          {{ vote }}
        </li>
      </ul>
    </div>

    <div v-else>
      <alert-component
        response-message="This room does not exist."
        alert-role="alert"
        alert-error-msg="Not Found!"
        alert-class="alert-danger"
        class="mt-4"
      ></alert-component>
    </div>

    <div class="members">
      <h3>
        Room #<strong>{{ this.$route.params.roomId }}</strong>
        • Connected
        <strong>{{ getRoomUsers.length }}</strong>
      </h3>
      <ul id="memberList" v-if="getRoomUsers.length > 0">
        <li :key="index" v-for="(member, index) in getRoomUsers">
          <div class="status">{{ member.pivot.voted ? '✅' : '' }}</div>
          <div class="name">
            {{ member.name }} {{ userAuthenticated(member.id) }}
          </div>
          <div class="vote">
            {{ member.pivot.vote_value != 0 ? member.pivot.vote_value : '-' }}
          </div>
        </li>
      </ul>
      <ul v-else>
        <p class="font-weight-bold">No users</p>
      </ul>
    </div>

    <hr />
    <pre style="text-align: left">
        <strong>PHP res: {{ getVoteRes }}</strong>
        <!-- response here {{ poner aquí el ganador }} -->
</pre>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AlertComponent from './AlertComponent';
export default {
  components: {
    AlertComponent,
  },
  name: 'Lobby',
  data() {
    return {
      validVotes: [1, 2, 3, 5, 8, 13, 20, 40, '?'],
      members: [
        { name: 'Julian (you)', vote: false },
        { name: 'Flor', vote: false },
        { name: 'Gino', vote: false },
      ],
      responsesDemo: {
        php: null,
        node: null,
      },
      voted: null,
      request_response: {},
    };
  },
  computed: {
    ...mapGetters('room', ['getRoomUsers', 'getVoteRes']),
  },

  methods: {
    userAuthenticated(id) {
      const user_authenticated = JSON.parse(localStorage.getItem('user'));
      if (user_authenticated.id == id) {
        return '(You)';
      } else return '(Player)';
    },

    async giveVote(vote, event) {
      if (!this.voted) {
        const joined_to = JSON.parse(localStorage.getItem('joined_to'));
        if (joined_to && joined_to.includes(this.$route.params.roomId)) {
          event.target.classList.toggle('voted');

          try {
            console.log('Entra esta mierda!!!')
            const result = await this.$store.dispatch('room/setVote', { vote : vote });
            if (typeof result === 'string') {
              this.showAlertError(
                true,
                result,
                'alert',
                'Voting Error!',
                'alert-danger'
              );
            } else {
              this.voted = true;
            }
          } catch (error) {
            this.showAlertError(
              true,
              'please contact the administrator',
              'alert',
              'Fatal error!',
              'alert-danger'
            );
          }
        }
      }
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

  async beforeCreate() {
    await this.$store.dispatch('room/getRoomUsers', {
      id: this.$route.params.roomId,
    });
  },
};
</script>

<style scoped></style>
