<template>
  <div class="blur-bg">
    <div class="wrapper">
      <span
        v-if="apiValidationStatus === null"
        class="loading-indicator"
      ></span>
      <span v-if="apiValidationStatus === true" class="validate-sucess"></span>
      <span
        v-if="apiValidationStatus === false"
        class="validation-failed"
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    apiValidationStatus: [null, Boolean],
  },
};
</script>

<style scoped>
.blur-bg {
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #0005;
  backdrop-filter: blur(5px);
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100px;
  height: 100px;
  background: #fff;
  border-radius: 20px;
}
.loading-indicator {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid var(--color_systemBlue);
  background: inherit;
}
.loading-indicator::before {
  content: "";
  width: inherit;
  height: 25px;
  background: inherit;

  transform-origin: right;
  translate: -50%;
  animation: indicator-rotate 800ms linear infinite;
}
.validate-sucess {
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;

  translate: -3px -7px;
  width: 50px;
  height: 50px;
}
.validate-sucess::before,
.validate-sucess::after {
  content: "";
  position: absolute;
  width: 2px;
  height: 45px;
  background: var(--color_systemGreen);
  border-radius: 10px;
  transform-origin: bottom;
  rotate: 40deg;
}
.validate-sucess::after {
  height: 20px;
  rotate: -45deg;
}

.validation-failed {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 50px;
  height: 50px;
}
.validation-failed::before,
.validation-failed::after {
  content: "";
  position: absolute;
  width: 2px;
  height: 50px;
  rotate: 45deg;
  background: var(--color_systemRed);
}
.validation-failed::after {
  rotate: -45deg;
}

@keyframes indicator-rotate {
  from {
    rotate: 0deg;
  }
  to {
    rotate: 360deg;
  }
}
</style>
