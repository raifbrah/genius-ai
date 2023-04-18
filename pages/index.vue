<template>
  <div class="index container">
    <TheHeader @clear-chat="clearChat" class="the-header" />
    <TheChats :typingProgress="typingProgress" :chats="chats" />
    <ChatInput
      :generationProcess="generationProcess"
      @sendMyMessage="sendMyMessage"
      class="chat-input"
    />
    <WelcomeWindow />
  </div>
</template>

<script>
export default {
  data() {
    return {
      chats: [],
      generationProcess: false,
      typingProgress: false,
    };
  },
  mounted() {
    if (localStorage.getItem("chats")) {
      this.chats = JSON.parse(localStorage.getItem("chats"));
    }
  },
  methods: {
    async clearChat() {
      this.chats = [];
      localStorage.setItem("chats", JSON.stringify(this.chats));
    },
    async sendMyMessage(myMessage) {
      this.generationProcess = true;
      this.typingProgress = true;
      this.chats.push({
        role: "user",
        content: myMessage,
      });
      localStorage.setItem("chats", await JSON.stringify(this.chats));
      window.scroll({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });

      this.generatingResponse();
    },
    async generatingResponse() {
      try {
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
        let pushToChats = false;

        const reader = response.body
          .pipeThrough(new TextDecoderStream())
          .getReader();

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          this.typingProgress = false;

          if (this.scrollDistanceToTheBottom() < 150) {
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
              break;
            }

            if (pushToChats === false) {
              pushToChats = true;
              this.chats.push({
                role: "assistant",
              });
            }

            const json = JSON.parse(message);
            const token = json.choices[0].delta.content;
            if (token) {
              mdText += token;
              this.chats[this.chats.length - 1].content = mdText;
            }
          }
        }
        this.generationProcess = false;

        if (response.status === 401) {
          alert("API ключ отсутсвуют или не действительный");
        }
      } catch (error) {
        this.typingProgress = false;
        this.generationProcess = false;
        console.error("Error:", error);
        alert("Похоже проблемы с интернетом 🤔\nПовторите попытку позже.");
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
.index {
  position: relative;
}
</style>
