<template>
  <div class="wrapper-rooms">
    <div class="wrapper-content">
      <router-link to="/rooms" class="btn btn-primary">Go back</router-link>
      <h1 class="mb-4 text-center text-white">Room #{{id}} Details</h1>

      <h2 class="mb-4 text-white">User Voted</h2>
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import UsersComponent from "../components/UsersComponent";
import DetailsComponent from "../components/DetailsComponent";
export default {
 components: {
    UsersComponent,
    DetailsComponent
 },
 data() {    
    return {     
        id: 0   
    };
  },

  computed: {
    ...mapGetters(["getDetails"]),
  },


  async beforeCreate() {  
    const id =  await this.$route.params.roomId; 
    this.id= id;   
    await this.$store.dispatch("getDetails",{
        room_id:id
    });
  },

  mounted() {
    this.$store.dispatch("autoLogout");
    
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
