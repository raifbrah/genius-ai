// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        {
          name: "theme-color",
          media: "(prefers-color-scheme: light)",
          content: "#F1F1F1",
        },
        {
          name: "theme-color",
          media: "(prefers-color-scheme: dark)",
          content: "#0D0D0D",
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
          href: "./icons/ios/512.png",
        },
      ],
    },
  },
});
