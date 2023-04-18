// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Genius AI",
    },
  },
  modules: ["@kevinmarrec/nuxt-pwa"],
  pwa: {
    manifest: {
      name: "Genius AI",
      short_name: "Genius AI",
      lang: "ru",
      description: "Fast AI Chat",
    },
  },
});
