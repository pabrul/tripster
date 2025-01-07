// https://nuxt.com/docs/api/configuration/nuxt-config
// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/icon",
    "@pinia/nuxt",
    "@nuxtjs/google-fonts",
  ],
  css: ["~/assets/css/tailwind.css"],
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config.js",
  },
  googleFonts: {
    families: {
      Roboto: true,
      "Open+Sans": true,
      Montserrat: [400, 500, 600, 700],
      Lato: {
        wght: [100, 300, 400, 700],
        ital: [100],
      },
    },
    display: "swap",
  },
});
