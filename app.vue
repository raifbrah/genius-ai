<style src="assets/stylesheets/apple-colors.css"></style>
<style src="assets/stylesheets/main.css"></style>

<template>
  <div>
    <NuxtPage />
  </div>
</template>

<style>
.next-enter-active,
.next-leave-active,
.back-enter-active,
.back-leave-active {
  transition: opacity 150ms, translate 150ms;
}
.next-enter-from,
.next-leave-to,
.back-enter-from,
.back-leave-to {
  opacity: 0;
  translate: -50px 0px;
}

.back-enter-from,
.back-leave-to {
  translate: 50px 0px;
}
</style>
