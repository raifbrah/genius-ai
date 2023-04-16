<template>
  <header class="header blur-panel">
    <div class="header__left">
      <NuxtLink v-if="$route.path === '/'" to="/settings" class="header__btn"
        >Настройки</NuxtLink
      >
      <NuxtLink v-if="$route.path === '/settings'" to="/" class="header__btn"
        >Назад</NuxtLink
      >
    </div>
    <h4 class="header__title">{{ titleName }}</h4>
    <div class="header__right">
      <span v-if="$route.path === '/'" @click="clearChat" class="header__btn"
        >Очистить</span
      >
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    clearChat() {
      this.$emit("clear-chat");
    },
  },
  computed: {
    titleName() {
      if (this.$route.path === "/") {
        return "ChatGPT";
      } else if (this.$route.path === "/settings") {
        return "Настройки";
      }
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 15px;
  height: 45px;
}

.header__title {
  user-select: none;
}

.header__left,
.header__right {
  display: flex;
  width: 33%;
}
.header__right {
  justify-content: flex-end;
}

.header__btn {
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  color: var(--color_systemBlue);
}
</style>
