<template>
  <div v-if="visibility" class="blur-bg">
    <div class="welcome-window">
      <div v-if="page === 1" class="welcome-window__text">
        <h3>Привет, дорогой друг!👋</h3>
        <p>
          Меня зовут
          <a href="https://www.instagram.com/raifbrah/" target="_blank">Раиф</a
          >, я разработчик данного приложения.
        </p>
        <p>Я сделал его для тебя полностью бесплатным.</p>
        <p>
          Но если ты захочешь поблагодарить меня за старания, в
          <a href="/settings" target="_blank">настройках</a>
          есть специальный раздел с донатами :)
        </p>
      </div>

      <div v-if="page === 2" class="welcome-window__text">
        <h3>API ключ 🔑</h3>
        <p>
          API ключ необходим для работы приложения, без него не получиться
          связаться с сервером для обработки вашего запроса.
        </p>
        <div>
          Для получения API ключа необходимо:
          <ol>
            <li>
              Обязательно прочитать
              <a
                href="https://sore-moat-1fb.notion.site/ef0acb6113164e8b814c11cde89a782d"
                target="_blank"
                >инструкцию по получению API ключа</a
              >
            </li>
            <li>
              Перейти по
              <a
                href="https://platform.openai.com/account/api-keys"
                target="_blank"
                >данной ссылке</a
              >
              <p>
                ❗ Если вы находитесь на территории России, по ссылке нужно
                переходить со включенным VPN.
              </p>
            </li>
            <li>Нажать "Create new secret key"</li>
            <li>Скопировать ключ и вставить его ниже👇</li>
          </ol>
        </div>
        <ApiKeyInput class="api-key-input-component" />
        <p>
          P.S. Приложением можно пользоваться без VPN, его нужно включить только
          для того, чтобы получить API ключ.
        </p>
      </div>

      <div class="welcome-window__buttons">
        <TheButton v-if="page > 1" @click="previousPage()" title="Назад" />
        <TheButton
          v-if="page < 2"
          @click="nextPage()"
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
    if (localStorage.getItem("WelcomePage_pageNumber")) {
      this.page = JSON.parse(localStorage.getItem("WelcomePage_pageNumber"));
    }

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
    close() {
      this.visibility = false;
    },
    nextPage() {
      this.page++;
      localStorage.setItem("WelcomePage_pageNumber", this.page);
    },
    previousPage() {
      this.page--;
      localStorage.setItem("WelcomePage_pageNumber", this.page);
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
  background: var(--color_bg);
  padding: 20px;
  border-radius: 20px;

  box-shadow: 0px 2px 20px var(--color_popupWindowShadow);
  border: var(--ui_popupWindowBorder);
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
  margin: 20px 0px;
}
</style>
