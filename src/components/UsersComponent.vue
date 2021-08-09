<template>
  <div class="wrapper-room">
    <div class="index-circle">{{ id }}</div>
    <div class="form-group" role="group">
      <p>
        <span><strong>User Name:</strong> {{ name }}</span>
      </p>
    </div>
    <button class="btn btn-primary set-position-button-value">
      {{ value }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
      description: 'user name',
    },
    id: {
      type: Number,
      required: true,
      description: 'user id',
    },
    value: {
      type: Number,
      required: true,
      description: 'value',
    },
  },

  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.wrapper-room {
  width: 100%;
  background-image: linear-gradient(-20deg, #00cdac 0%, #8ddad5 100%);
  margin: 1rem auto;
  padding: 0.7rem;
  border-radius: 5px;
  cursor: pointer;
  transform: scale(0.92);
  transition: transform 300ms ease-out, background-image 300ms ease-out,
    color 300ms ease-in;

  div {
    p {
      display: flex;
      justify-content: start;
      align-items: center;
      height: 100%;
      margin: 0;
    }
  }
}

.wrapper-room:hover {
  transform: scale(1);
}

.index-circle {
  width: 50px;
  height: 50px;
  left: -60px;
  top: 0px;
  border-radius: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  background-image: linear-gradient(to right, #243949 0%, #517fa4 100%);
  font-weight: bold;
  transition: all 300ms ease-out;
}

.wrapper-room:hover .index-circle {
  transform: scale(0.9);
}

.set-position-button-value {
  width: 100px;
  height: 50px;
  right: -110px;
  top: 0px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
  font-weight: bold;
  transition: all 300ms ease-out;
  transform: scale(0.82);
}

.set-position-button-value:hover {
  transform: scale(1);
}
</style>
