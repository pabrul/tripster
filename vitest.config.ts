/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: "jsdom", // Ambiente necessário para testes com DOM
    setupFiles: "./test/setup.ts",
    coverage: {
      provider: "istanbul",
      reportsDirectory: "./coverage",
      all: true,
      include: ["components/**/*.vue", "pages/**/*.vue", "store/**/*.ts"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
});
