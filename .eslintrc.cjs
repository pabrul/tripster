module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: ["@nuxtjs/eslint-config-typescript", "plugin:vue/vue3-recommended"],
  rules: {
    // Desabilitar regras mais rigorosas
    "vue/multi-word-component-names": "off",
    "vue/require-default-prop": "off",
    "vue/no-mutating-props": "warn",
    "@typescript-eslint/no-unused-vars": "warn",
    "no-console": "off",
    "require-await": "off",
    "arrow-parens": "off",
    "space-before-function-paren": "off",
    "func-call-spacing": "off",

    // Manter algumas regras básicas como warning ao invés de error
    quotes: ["warn", "single"],
    semi: ["warn", "always"],
    "comma-dangle": ["warn", "always-multiline"],

    // Relaxar regras de importação
    "import/order": "off",
    "import/named": "off",
    "import/namespace": "off",
    "import/default": "off",
    "import/export": "off",

    // Desabilitar regras TypeScript mais rigorosas
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-explicit-any": "off",

    "@typescript-eslint/no-empty-interface": "off",
    "no-useless-catch": "off",
  },
};
