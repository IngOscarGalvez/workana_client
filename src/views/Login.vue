<template>
  <b-container fluid class="wrapper-content">
    <b-row>
      <b-col
        cols="12"
        sm="12"
        md="8"
        lg="8"
        xl="8"
        class="h-100 set-height-column wrapper-background-img p-0"
      >
        <div class="set-background-img"></div>
      </b-col>
      <b-col
        cols="12"
        sm="12"
        md="4"
        lg="4"
        xl="4"
        class="
          set-height-column set-background-column
          d-flex
          justify-content-center
        "
      >
        <b-form class="w-100 my-4" @submit.prevent="submitData">
          <div class="alert alert-danger" role="alert" v-if="show_error">
            <strong>Error!</strong> All fields are required
          </div>

          <div role="group">
            <img
              src="../assets/icons/poker_icon.png"
              alt="Poker icon"
              width="50"
            />
            <legend>Poker Login</legend>
          </div>
          <div role="group">
            <label for="input-live">Email:</label>
            <b-form-input
              id="input-email"
              v-model="email"
              :state="emailState"
              aria-describedby="input-live-help input-live-feedback"
              placeholder="Enter your email"
              trim
            ></b-form-input>

            <b-form-invalid-feedback id="input-live-feedback">
              Your email is not validated
            </b-form-invalid-feedback>

            <b-form-text id="input-live-help">Only validate email.</b-form-text>
          </div>

          <div role="group">
            <label for="input-live">Password:</label>
            <b-form-input
              type="password"
              id="input-password"
              v-model="password"
              :state="passwordState"
              aria-describedby="input-live-help input-live-feedback"
              placeholder="Enter your password"
              trim
            ></b-form-input>

            <b-form-invalid-feedback id="input-live-feedback">
              Enter your password
            </b-form-invalid-feedback>

            <b-form-text id="input-live-help">Your password.</b-form-text>
          </div>

          <div role="group" class="d-flex justify-content-between">
            <b-button type="danger" block variant="danger">Submit</b-button>
            <router-link to="/register" block class="btn btn-dark"
              >Register</router-link
            >
          </div>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",

      email_validated: false,
      show_error: false,
    };
  },
  methods: {
    async submitData() {
      if (!this.email_validated || this.password.length < 4) {
        this.show_error = true;
        setTimeout(() => {
          this.show_error = false;
        }, 4000);
        return;
      }

      this.show_error = false;

      try {
        await this.$store.dispatch("login", {
          email: this.email,
          password: this.password,
        });

        // this.$route.push("/rooms");
        window.location.reload();
      } catch (error) {
        console.log(error);
        // show error message
      }
    },
  },

  computed: {
    emailState() {
      const emailRegex = new RegExp(
        "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
      );
      if (this.email.length == 0) {
        this.email_validated = false;
        return null;
      }

      if (emailRegex.test(this.email)) {
        this.email_validated = true;
        return true;
      }

      this.email_validated = false;
      return false;
    },

    passwordState() {
      return this.password.length > 7
        ? true
        : this.password.length == 0
        ? null
        : false;
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper-content {
  height: 100vh;
  width: 100vw;
  .set-height-column {
    height: 100vh;
  }

  .wrapper-background-img {
    .set-background-img {
      height: 100vh;
      background: linear-gradient(
          to right,
          rgba(9, 32, 63, 0.7) 0%,
          rgba(83, 120, 149, 0.7) 100%
        ),
        url(../assets/images/back_login.jpg);
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }
  }
}
</style>
