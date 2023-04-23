<template>
  <div v-if="visibility" class="blur-bg">
    <div class="welcome-window">
      <div v-if="page === 1" class="welcome-window__text">
        <h3>Привет, дорогой друг!👋</h3>
        <p>
          👨‍💻Меня зовут
          <a href="https://www.instagram.com/raifbrah/" target="_blank">Раиф</a
          >, я разработчик данного приложения.
        </p>
        <p>Я сделал его для тебя полностью бесплатным🙌</p>
        <p>
          Но если ты захочешь поблагодарить меня за старания, в
          <a href="/settings" target="_blank">настройках</a>
          есть специальный раздел с донатами🙏
        </p>
      </div>

      <div v-if="page === 2" class="welcome-window__text">
        <h3>API ключ 🔑</h3>
        <p>
          API ключ нужен для работы приложения, без него не получиться связаться
          с сервером для обработки вашего запроса.
        </p>
        <p>Бояться не стоит, он будет храниться только на вашем устройстве.</p>
        <div>
          Для получения API ключа необходимо:
          <ol>
            <li>
              Перейти по
              <a
                href="https://platform.openai.com/account/api-keys"
                target="_blank"
                >данной ссылке</a
              >
            </li>
            <li>Нажать "Create new secret key"</li>
            <li>Скопировать ключ и вставить его ниже👇</li>
          </ol>
        </div>
        <p>
          ❗ Если вы находитесь на территории России, по ссылке нужно переходить
          со включенным VPN.
        </p>
        <ApiKeyInput class="api-key-input-component" />
      </div>

      <div class="welcome-window__buttons">
        <TheButton v-if="page > 1" @click="page--" title="Назад" />
        <TheButton
          v-if="page < 2"
          @click="page++"
          title="Дальше"
          class="welcome-window__button_right"
        />
        <TheButton
          @click="close"
          v-if="page === 2"
          title="Готово"
          class="welcome-window__button_right"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      visibility: false,
    };
  },
  mounted() {
    if (
      localStorage.getItem("apiKey") &&
      localStorage.getItem("apiKey").trim() !== ""
    ) {
      this.visibility = false;
    } else {
      this.visibility = true;
    }
  },
  methods: {
    async close() {
      this.visibility = false;
    },
  },
};
</script>

<style scoped>
p {
  margin: 10px 0px;
}
.welcome-window {
  gap: 20px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  max-width: min(calc(100vw - 40px), 550px);
  max-height: calc(100vh - 40px);
  min-height: 250px;
  overflow-y: auto;
  background: #000;
  padding: 20px;
  border-radius: 20px;

  border: 1px solid var(--color_border);
}
.welcome-window__buttons {
  gap: 5px;
  display: flex;
  justify-content: space-between;
}
.welcome-window__button_right {
  margin-left: auto;
}

.welcome-window__text ul,
.welcome-window__text ol {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-left: 2rem;
  margin: 1em 0px;
}
.welcome-window__text ul {
  list-style: disc;
}

.api-key-input-component {
  margin-top: 20px;
}
</style>
