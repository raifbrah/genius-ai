<template>
  <div class="container">
    <TheHeader @clear-chat="clearChat" class="the-header" />
    <TheChats :chats="chats" />
    <ChatInput @sendMyMessage="sendMyMessage" class="chat-input" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      chats: [],
    };
  },
  mounted() {
    if (localStorage.getItem("chats")) {
      this.chats = JSON.parse(localStorage.getItem("chats"));
    }
  },
  methods: {
    clearChat() {
      this.chats = [];
      localStorage.setItem("chats", JSON.stringify(this.chats));
    },
    sendMyMessage(myMessage) {
      this.chats.push({
        role: "user",
        content: myMessage,
      });
      localStorage.setItem("chats", JSON.stringify(this.chats));

      this.generatingResponse();
    },
    async generatingResponse() {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `Bearer ${localStorage.getItem("apiKey")}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: this.chats,
            stream: true,
          }),
        },
        { responseType: "stream" }
      );

      let mdText = "";
      this.chats.push({
        role: "assistant",
      });

      const reader = response.body
        .pipeThrough(new TextDecoderStream())
        .getReader();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        if (this.scrollDistanceToTheBottom() < 100) {
          window.scroll({
            top: document.body.scrollHeight,
            behavior: "smooth",
          });
        }

        const lines = value
          .split("\n")
          .filter((line) => line.trim().startsWith("data: "));

        for (const line of lines) {
          const message = line.replace(/^data: /, "");
          if (message === "[DONE]") {
            localStorage.setItem("chats", JSON.stringify(this.chats));
            return;
          }

          const json = JSON.parse(message);
          const token = json.choices[0].delta.content;
          if (token) {
            mdText += token;
            this.chats[this.chats.length - 1].content = mdText;
          }
        }
      }
    },
    scrollDistanceToTheBottom() {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      const clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;

      const remainingScroll = scrollHeight - scrollTop - clientHeight;
      return remainingScroll;
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
}
</style>
