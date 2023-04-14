<template>
  <span class="button">{{ title }}</span>
</template>

<script>
export default {
  props: {
    title: String,
  },
};
</script>

<style scoped>
.button {
  color: #fff;
  background: var(--color_systemBlue);
  border-radius: 7px;
  padding: 7px 12px;
  cursor: pointer;
  user-select: none;
  text-align: center;
}
.button:active {
  box-shadow: inset 0px 1px 5px #0005;
}
</style>
