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
          <alert-component
            v-if="request_response.request_error"
            :response-message="request_response.request_msg"
            :alert-role="request_response.alert_role"
            :alert-error-msg="request_response.alert_error_msg"
            :alert-class="request_response.alert_class"
          ></alert-component>

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
              type="password"
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
              type="password"
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
import {
  validateEmail,
  validatePasswordRegister,
  validateUserName,
  checkPassword,
} from '../helpers/herlpers';
import AlertComponent from '../components/AlertComponent.vue';

export default {
  components: {
    AlertComponent,
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      password_confirm: '',

      show_error: false,
      validation: {
        name: false,
        email: false,
        password: false,
        password_confirm: false,
      },

      request_response: {},
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
        let result = await this.$store.dispatch('register', {
          name: this.name,
          email: this.email,
          password: this.password,
          confirmation_password: this.password_confirm,
        });

        if (typeof result === 'string') {
          this.showAlertError(
            true,
            result,
            'alert',
            'Registry Error!',
            'alert-danger'
          );
        } else {
          window.location.reload();
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
    },

    validateFormField(validation, form_data, field_to_validate) {
      return validation
        ? (form_data[field_to_validate] = true)
        : validation === null
        ? (form_data[field_to_validate] = null)
        : (form_data[field_to_validate] = false);
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

  computed: {
    nameState() {
      let result = validateUserName(this.name);
      return this.validateFormField(result, this.validation, 'name');
    },

    emailState() {
      let result = validateEmail(this.email);
      return this.validateFormField(result, this.validation, 'email');
    },

    passwordState() {
      let result = validatePasswordRegister(this.password);
      return this.validateFormField(result, this.validation, 'password');
    },

    confirmPassState() {
      let result = checkPassword(this.password, this.password_confirm);
      return this.validateFormField(
        result,
        this.validation,
        'password_confirm'
      );
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
