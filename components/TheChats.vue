<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/github-dark.min.css"
  />
  <ul class="chats-container">
    <li
      v-for="chat in chats"
      :class="{
        chat_user: chat.role === 'user' ? true : false,
      }"
      class="chat"
    >
      <Markdown :source="chat.content" />
    </li>
    <TypingProgress v-if="typingProgress" />
  </ul>
</template>

<script>
import Markdown from "vue3-markdown-it";

export default {
  components: {
    Markdown,
  },
  props: {
    chats: Object,
    typingProgress: Boolean,
  },
};
</script>

<style>
.chats-container {
  gap: 7px;
  display: flex;
  flex-direction: column;
  list-style: none;

  margin: 0;
}

.chat {
  width: 80%;
  max-width: max-content;
  padding: 10px 13px;
  background: var(--color_systemGray);
  border: 1px solid #e1e1e1;
  border-radius: 17px;
}
.chat_user {
  color: #fff;
  align-self: flex-end;
  border: none;
  background: var(--color_systemBlue);
}

.chat ul,
.chat ol {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-left: 2rem;
  margin: 1rem 0px;
}
.chat ul {
  list-style: disc;
}
.chat > div > p {
  margin: 1rem 0px;
}
.chat > div > p:first-child {
  margin-top: 0px;
}
.chat > div > p:last-child {
  margin-bottom: 0px;
}

.chat * {
  overflow-wrap: anywhere;
}

.chat code {
  font-weight: bold;
}
.chat pre {
  overflow-x: auto;
  margin: 1em 0px;
  border-radius: 5px;
}
.chat pre code {
  font-weight: normal;
}
</style>
