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
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Tripster - Your Ultimate Travel Companion",
      meta: [
        // Essential Meta Tags
        {
          name: "description",
          content:
            "Discover and book amazing travel experiences with Tripster. Find hotels, create itineraries, and explore destinations worldwide.",
        },
        { name: "format-detection", content: "telephone=no" },
        { name: "theme-color", content: "#ffffff" },

        // Open Graph Meta Tags (Facebook)
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Tripster" },
        {
          property: "og:title",
          content: "Tripster - Your Ultimate Travel Companion",
        },
        {
          property: "og:description",
          content:
            "Discover and book amazing travel experiences with Tripster. Find hotels, create itineraries, and explore destinations worldwide.",
        },
        { property: "og:image", content: "/og-image.jpg" },

        // Twitter Card Meta Tags
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: "Tripster - Your Ultimate Travel Companion",
        },
        {
          name: "twitter:description",
          content:
            "Discover and book amazing travel experiences with Tripster. Find hotels, create itineraries, and explore destinations worldwide.",
        },
        { name: "twitter:image", content: "/og-image.jpg" },

        // Keywords and author
        {
          name: "keywords",
          content:
            "travel, hotels, booking, itinerary, vacation, tourism, destinations, trips",
        },
        { name: "author", content: "Tripster" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "canonical", href: "https://tripster.com" }, // Substitua pelo seu domínio real
      ],
    },
  },
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
  extends: "./base",
});
