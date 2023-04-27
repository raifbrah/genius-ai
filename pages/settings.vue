<template>
  <div class="settings">
    <div class="container">
      <TheHeader class="the-header" />
      <RequestProcessing
        v-if="requestProcessing"
        :api-validation-status="apiValidationStatus"
      />

      <SettingsCategory title="api ключ">
        <div class="elem">
          <input
            @input="setApiKey"
            v-model="apiKey"
            class="elem__input"
            type="password"
            placeholder="Введи ключ API..."
          />
        </div>
        <div class="elem">
          <span @click="validateApiKey" class="elem__button"
            >Проверить ключ</span
          >
        </div>
      </SettingsCategory>

      <SettingsCategory title="Поддержка">
        <div class="elem">
          <a
            class="elem__button"
            target="_blank"
            href="https://platform.openai.com/account/api-keys"
            >API ключи</a
          >
        </div>
        <div class="elem">
          <a class="elem__button" href="mailto:raifbrah@yandex.ru"
            >Связаться со мной</a
          >
        </div>
        <div class="elem">
          <a
            class="elem__button"
            target="_blank"
            href="https://www.instagram.com/raifbrah/"
            >Instagram</a
          >
        </div>
      </SettingsCategory>

      <SettingsCategory title="Поддержать разработчика донатом">
        <div class="elem">
          <a
            class="elem__button"
            target="_blank"
            href="https://www.tinkoff.ru/rm/yarullin.raif1/qLMMc14619"
            >Tinkoff</a
          >
        </div>
        <div class="elem">
          <a
            class="elem__button"
            target="_blank"
            href="http://qiwi.com/n/RAIFBRAH"
            >Qiwi</a
          >
        </div>
        <div class="elem">
          <a
            class="elem__button"
            target="_blank"
            href="https://forms.yandex.ru/u/643a9df25056901613eaef4d/"
            >Юmoney</a
          >
        </div>
        <div class="elem">
          <a
            class="elem__button"
            target="_blank"
            href="https://boosty.to/raifbrah/donate"
            >Boosty</a
          >
        </div>
        <div class="elem">
          <span>USDT | TRC20 : TBR5DTmEaMHWp7DW6occQFhJkzJ8t8fLBJ</span>
        </div>
      </SettingsCategory>
    </div>
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
          alert("Похоже проблемы с интернетом 🤔\nПовторите попытку позже.");
          this.requestProcessing = false;
          return false;
        });
    },
  },
};
</script>

<style scoped>
.settings {
  min-height: 100vh;
  background: var(--color_settingsBg);
}
.container {
  gap: 25px;
  display: flex;
  flex-direction: column;
}

.elem {
  overflow-wrap: anywhere;
  display: flex;
  align-items: center;

  min-height: 40px;
  padding: 10px 10px 10px 0px;
  border-bottom: 1px solid var(--color_settingsCategoryBorder);
}
.elem:last-child {
  border-bottom: none;
}

.elem__input {
  width: 100%;
  border: none;
  outline: none;
  font-size: inherit;

  color: var(--color_font);
  background: transparent;
}
.elem__button {
  width: 100%;
  cursor: pointer;
  color: var(--color_systemBlue);
  user-select: none;
  text-decoration: none;
}
</style>
