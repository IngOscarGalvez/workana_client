<template>
  <div
    :class="alertClass"
    class="alert alert-dismissible fade show"
    :role="alertRole"
  >
    <strong>{{ alertErrorMsg }}</strong> {{ responseMessage }}
  </div>
</template>

<script>
export default {
  props: {
    responseMessage: {
      type: String,
      required: true,
      description: 'Response message from server',
    },

    alertRole: {
      type: String,
      required: true,
      default: 'alert',
      description: 'Alert type',
    },

    alertErrorMsg: {
      type: String,
      required: true,
      default: 'Error!',
      description: 'Response message from server',
    },

    alertClass: {
      type: String,
      required: true,
    },
  },

  data() {
    return {};
  },
};
</script>

<style></style>
