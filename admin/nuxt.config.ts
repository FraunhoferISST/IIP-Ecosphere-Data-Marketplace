import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL ?? "/",
    head: {
      charset: "utf-16",
      title: "IIPE Marketplace Admin",
      meta: [
        {
          name: "description",
          content: `IIP-Ecosphere Marketplace Admin application`,
        },
      ],
      link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
    },
  },
  build: {
    transpile: ["vuetify"],
  },
  runtimeConfig: {
    apiBaseUrl:
      process.env.NUXT_API_BASE_URL || "http://localhost:3000/graphql",
    public: {
      frontendBaseUrl:
        process.env.NUXT_FRONTEND_BASE_URL || "http://localhost:5000",
      disableRegistration: process.env.NUXT_DISABLE_REGISTRATION,
    },
  },
  modules: ["cookie-universal-nuxt"],
  css: [
    "vuetify/lib/styles/main.sass",
    "material-design-icons-iconfont/dist/material-design-icons.css",
  ],
  vite: {
    vue: {
      reactivityTransform: true,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            '@import "@/assets/styles/dashboard.scss";@import "@/assets/styles/colors.scss";',
        },
      },
    },
  },
});
