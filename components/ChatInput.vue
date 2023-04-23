<template>
  <div class="chat-input blur-panel">
    <input
      @keyup.enter="sendMyMessage"
      v-model="myMessage"
      class="input"
      type="text"
      placeholder="Введите запрос..."
    />
    <SendButton
      @click="sendMyMessage"
      :class="{
        'send-button_disabled': generationProcess,
      }"
      class="send-button"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      myMessage: "",
    };
  },
  props: {
    generationProcess: Boolean,
  },
  methods: {
    sendMyMessage() {
      if (this.myMessage.trim() !== "" && this.generationProcess === false) {
        this.$emit("sendMyMessage", this.myMessage);
        this.myMessage = "";
      }
    },
  },
};
</script>

<style scoped>
.chat-input {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  align-items: flex-end;
  gap: 5px;

  padding: 10px 15px 20px;
}

.blur-panel {
  border-top: 1px solid var(--color_border);
}

.input {
  height: 35px;
  width: 100%;

  font-size: 16px;
  font-family: inherit;
  padding: 10px;
  outline: none;
  border: 1px solid var(--color_border);
  border-radius: 300px;

  color: var(--color_font);
  background: var(--color_bg);
}

.send-button {
  flex-shrink: 0;
  width: 35px;
  height: 35px;

  cursor: pointer;
}
.send-button_disabled {
  opacity: 0.5;
}
</style>
