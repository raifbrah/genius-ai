<template>
  <div class="typing-progress">
    <i class="typing-progress__circle"></i>
    <i class="typing-progress__circle"></i>
    <i class="typing-progress__circle"></i>
  </div>
</template>

<style scoped>
.typing-progress {
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  width: 55px;
  height: 30px;
  background: var(--color_systemGray);
  border-radius: 7px;
}
.typing-progress__circle {
  width: 8px;
  height: 8px;
  background: var(--color_systemDarkGray);
  border-radius: 50%;

  translate: 0px 2px;
  animation: circles_anim 350ms ease-in-out infinite alternate;
}
.typing-progress__circle:nth-child(2) {
  animation-delay: 175ms;
}
.typing-progress__circle:nth-child(3) {
  animation-delay: 350ms;
}

@keyframes circles_anim {
  from {
    translate: 0px 2px;
  }
  to {
    translate: 0px -2px;
  }
}

@media (prefers-color-scheme: dark) {
  .typing-progress {
    border: none;
  }
}
</style>
