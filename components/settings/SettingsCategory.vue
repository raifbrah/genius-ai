<template>
  <div class="settings-category">
    <h6 class="title">{{ title }}</h6>
    <div class="elements">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
  },
};
</script>

<style scoped>
.title {
  color: #555;
  font-weight: normal;
  text-transform: uppercase;

  margin: 5px 0px;
  padding-left: 20px;
}

.elements {
  display: flex;
  flex-direction: column;

  padding-left: 20px;
  background: var(--color_settingsCategoryBg);
  border-radius: 17px;
}
</style>
