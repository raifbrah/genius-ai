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
        {
          rel: "manifest",
          href: "./manifest.json",
        },
        {
          rel: "apple-touch-icon",
          href: "./public/icons/ios/512.png",
        },
      ],
      script: [
        {
          type: "module",
          src: "./app.js",
        },
      ],
    },
  },
});
