<template>
  <div class="api-key-input">
    <RequestProcessing
      v-if="requestProcessing"
      :api-validation-status="apiValidationStatus"
    />
    <input
      v-model="apiKey"
      @input="setApiKey"
      class="api-key-input__input"
      type="password"
      placeholder="Введите API ключ..."
    />
    <TheButton
      @click="validateApiKey"
      title="Проверить"
      class="api-key-input__button"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      apiKey: "",
      requestProcessing: false,
      apiValidationStatus: null,
    };
  },
  mounted() {
    if (localStorage.getItem("apiKey")) {
      this.apiKey = localStorage.getItem("apiKey");
    }
  },
  methods: {
    setApiKey() {
      localStorage.setItem("apiKey", this.apiKey);
    },
    validateApiKey() {
      this.requestProcessing = true;
      const url = "https://api.openai.com/v1/chat/completions";
      const key = this.apiKey;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      };
      const body = {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: "Тут?",
          },
        ],
        temperature: 0,
        max_tokens: 1,
      };

      fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      })
        .then((response) => {
          if (response.ok) {
            this.apiValidationStatus = true;
          } else {
            this.apiValidationStatus = false;
          }
          setTimeout(() => {
            this.requestProcessing = false;
            this.apiValidationStatus = null;
          }, 2000);
        })
        .catch(() => {
          alert("Похоже проблемы с интернетом 🤔\nПовторите попытку еще раз.");
          this.requestProcessing = false;
          return false;
        });
    },
  },
};
</script>

<style scoped>
.api-key-input {
  display: flex;
  border: 1px solid #999;
  width: 100%;
  border-radius: 7px;
  overflow: hidden;
}

.api-key-input__input {
  outline: none;
  border: none;
  width: 100%;

  color: var(--color_font);
  background: var(--color_bg);
}

.api-key-input__button {
  border-radius: 0px;
  flex-shrink: 0;
}

@media (max-width: 320px) {
  .api-key-input {
    flex-direction: column;
  }
}

@media (prefers-color-scheme: dark) {
  .api-key-input {
    border: none;
  }
  .api-key-input__input {
    background: #222;
  }
}
</style>
