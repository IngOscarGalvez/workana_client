<template>
  <div id="container">
    <router-link to="/rooms" class="btn btn-primary">Go back</router-link>
    <div class="alert alert-danger mt-2" role="alert" v-if="error_messages">
      you are in guest mode, please go back and join the game.
    </div>

    <div class="vote">
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
    <div class="members">
      <h3>
        Room #<strong>{{ this.$route.params.roomId }}</strong>
        • Connected
        <strong>{{ getRoomUsers.length }}</strong>
      </h3>
      <ul id="memberList" v-if="getRoomUsers.length > 0">
        <li :key="index" v-for="(member, index) in getRoomUsers">
          <div class="status">{{ member.pivot.voted ? "✅" : "" }}</div>
          <div class="name">
            {{ member.name }} {{ userAuthenticated(member.id) }}
          </div>
          <div class="vote">
            {{ member.pivot.vote_value != 0 ? member.pivot.vote_value : "-" }}
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
import { mapGetters } from "vuex";
export default {
  name: "Lobby",
  data() {
    return {
      validVotes: [1, 2, 3, 5, 8, 13, 20, 40, "?"],
      members: [
        { name: "Julian (you)", vote: false },
        { name: "Flor", vote: false },
        { name: "Gino", vote: false },
      ],
      responsesDemo: {
        php: null,
        node: null,
      },
      voted: null,
      error_messages: false,
    };
  },
  computed: {
    ...mapGetters(["getRoomUsers", "getVoteRes"]),
  },

  methods: {
    userAuthenticated(id) {
      const user_authenticated = JSON.parse(localStorage.getItem("user"));
      if (user_authenticated.id == id) {
        return "(You)";
      } else return "(Player)";
    },

    giveVote(vote, event) {
      if (!this.voted) {
        const joined_to = JSON.parse(localStorage.getItem("joined_to"));
        if (joined_to && joined_to.includes(this.$route.params.roomId)) {
          event.target.classList.toggle("voted");
          this.voted = true;

          try {
            this.$store.dispatch("setVote", { vote });
          } catch (error) {
            console.log(error);
          }
        } else {
          this.error_messages = true;
          setTimeout(() => {
            this.error_messages = false;
          }, 5000);
        }
      }
    },
  },

  async beforeCreate() {
    await this.$store.dispatch("getRoomUsers", {
      id: this.$route.params.roomId,
    });
  },
};
</script>


<style scoped>
</style>