<template>
  <div>
    <router-view class="wrapper"> </router-view>
    <Logout class="set-position" />
  </div>
</template>

<script>
import Logout from './components/LogoutComponent';
import tokenAuth from './config/tokenAuth';

export default {
  components: {
    Logout,
  },

  data() {
    return {};
  },

 created() {
    const token = JSON.parse(localStorage.getItem('token'));    
    if (token) tokenAuth(token);
  },
};
</script>

<style lang="scss">
.set-position {
  position: fixed;
  right: 10px;
  top: 10px;
}
</style>
