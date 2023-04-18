// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: "next", mode: "out-in" },
  },
  modules: ["@kevinmarrec/nuxt-pwa"],
  pwa: {
    manifest: {
      name: "Genius AI",
      lang: "ru",
      description: "Fast AI Chat",
    },
  },
});
