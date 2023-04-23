// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        {
          name: "theme-color",
          media: "(prefers-color-scheme: light)",
          content: "#ffffff",
        },
        {
          name: "theme-color",
          media: "(prefers-color-scheme: dark)",
          content: "#000000",
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
