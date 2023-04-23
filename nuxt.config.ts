// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { name: "theme-color", content: "#ffffff" },
        {
          name: "apple-mobile-web-app-status-bar-style",
          content: "#ffffff",
        },
      ],
      title: "Genius AI",
      link: [
        { rel: "apple-touch-icon", href: "./public/apple-touch-icon.png" },
      ],
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
