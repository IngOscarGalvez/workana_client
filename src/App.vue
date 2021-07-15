<template>
  <div>
    <router-view class="wrapper"> </router-view>
    <Logout class="set-position" />
  </div>
</template>

<script>
import Logout from "./components/LogoutComponent";

export default {
  components: {
    Logout,
  },
  data() {
    return {};
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