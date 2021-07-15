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
            <label for="input-live">Name:</label>
            <b-form-input
              id="input-name"
              v-model="name"
              :state="nameState"
              aria-describedby="input-live-help input-live-feedback"
              placeholder="Enter your name"
              trim
            ></b-form-input>

            <b-form-invalid-feedback>
              Your name is not validated
            </b-form-invalid-feedback>

            <b-form-text id="input-live-help">Enter your name.</b-form-text>
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

            <b-form-invalid-feedback>
              Your email is not validated
            </b-form-invalid-feedback>

            <b-form-text id="input-live-help">Only validate email.</b-form-text>
          </div>

          <div role="group">
            <label for="input-live">Password:</label>
            <b-form-input
              id="input-password"
              v-model="password"
              :state="passwordState"
              aria-describedby="input-live-help input-live-feedback"
              placeholder="Enter your password"
              trim
            ></b-form-input>

            <b-form-invalid-feedback>
              Your password must be at least 8 characters, it must contain at
              least one uppercase and one lowercase letter and it must contain
              at least one symbol.
            </b-form-invalid-feedback>

            <b-form-text id="input-live-help">Your password.</b-form-text>
          </div>

          <div role="group">
            <label for="input-live">Confirm Password:</label>
            <b-form-input
              id="input-confirm-password"
              v-model="password_confirm"
              :state="confirmPassState"
              aria-describedby="input-live-help input-live-feedback"
              placeholder="Confirm your password"
              trim
            ></b-form-input>

            <b-form-invalid-feedback>
              Enter your confirm password
            </b-form-invalid-feedback>

            <b-form-text id="input-live-help"
              >Enter your password to confirm.</b-form-text
            >
          </div>

          <div role="group" class="d-flex justify-content-between">
            <b-button type="danger" variant="danger">Submit</b-button>
            <router-link to="/login" class="btn btn-dark">login</router-link>
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
      password_confirm: "",

      show_error: false,
      validation: {
        name: false,
        email: false,
        password: false,
        password_confirm: false,
      },
    };
  },
  methods: {
    async submitData() {
      const {
        name: v_name,
        email: v_email,
        password: v_pass,
        password_confirm: v_pass_cfm,
      } = this.validation;

      if (!v_name || !v_email || !v_pass || !v_pass_cfm) {
        this.show_error = true;
        setTimeout(() => {
          this.show_error = false;
        }, 4000);
        return;
      }

      this.show_error = false;

      try {
        await this.$store.dispatch("register", {
          name: this.name,
          email: this.email,
          password: this.password,
          confirmation_password: this.password_confirm,
        });

        window.location.reload();
      } catch (error) {
        console.log(error);
        // error.message || 'error en el registro'
        // show error message
      }
    },
  },

  computed: {
    nameState() {
      const nameRegex = new RegExp("^[a-zA-Z ]*$", "g");
      if (this.name.length == 0) {
        this.validation.name = false;
        return null;
      }
      if (nameRegex.test(this.name)) {
        this.validation.name = true;
        return true;
      } else {
        this.validation.name = false;
        return false;
      }
    },

    emailState() {
      const emailRegex = new RegExp(
        "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
      );
      if (this.email.length == 0) {
        this.validation.email = false;
        return null;
      }

      if (emailRegex.test(this.email)) {
        this.validation.email = true;
        return true;
      }

      this.validation.email = false;
      return false;
    },

    passwordState() {
      const passRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}[^'\s]/;

      if (this.password.length == 0) {
        this.validation.password = false;
        return null;
      }
      if (passRegex.test(this.password)) {
        this.validation.password = true;
        return true;
      } else {
        this.validation.password = false;
        return false;
      }
    },

    confirmPassState() {
      if (this.password_confirm.length == 0) {
        this.validation.password_confirm = false;
        return null;
      }
      if (this.password_confirm == this.password) {
        this.validation.password_confirm = true;
        return true;
      } else {
        this.validation.password_confirm = false;
        return false;
      }
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
        url(../assets/images/back_register.jpg);
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }
  }
}
</style>
