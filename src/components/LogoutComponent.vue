<template>
  <button
    class="btn btn-primary"
    @click="logout()"
    v-if="needsAuthentication()"
  >
    Logout
  </button>
</template>

<script>
export default {
  methods: {
    logout() {
      try {
        this.$store.dispatch("logout");
      } catch (error) {
        
      }
    },
    needsAuthentication() {
      if (Object.keys(this.$route.meta).length > 0) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style scoped>
button {
  background-image: linear-gradient(to top, #37ecba 0%, #72afd3 100%);
  border: none;
  transform: scale(0.9);
  transition: all 300ms ease-out;
}
button:hover {
  transform: scale(1);
}
</style>