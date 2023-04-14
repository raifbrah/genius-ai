<template>
  <div class="send-button">
    <i class="arrow"></i>
  </div>
</template>

<style scoped>
.send-button {
  position: relative;

  background: var(--color_systemBlue);
  border-radius: 50%;
}

.arrow {
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;

  width: 3px;
  height: 15px;
  background: #fff;
  border-radius: 100px;
}
.arrow::before,
.arrow::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 5px;

  rotate: -45deg;
  transform-origin: top left;

  background: inherit;
  border-radius: inherit;
}
.arrow::after {
  rotate: 45deg;
  transform-origin: top right;
}
</style>
