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
  display: flex;
  align-items: flex-end;
  gap: 5px;

  padding: 7px 7px 20px;
}

.input {
  height: 35px;
  width: 100%;

  font-size: 16px;
  padding: 10px;
  outline: none;
  border: 1px solid #aaa;
  border-radius: 300px;
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
