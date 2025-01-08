export default defineNuxtConfig({
  components: true, // Ativa o auto-import de componentes
  app: {
    head: {
      title: "Layer Base Example",
      meta: [{ name: "description", content: "Testing Nuxt Layers" }],
    },
  },
});
