module.exports = {
  root: true,

  env: {
    browser: true,
    node: true,
  },

  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
  },

  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
  ],

  plugins: ['@typescript-eslint'],

  rules: {
    '@typescript-eslint/no-explicit-any': 0,

    'vue/script-setup-no-uses-vars': 'off',
    'vue/multi-word-component-names': 0,
    'vue/require-default-prop': 0,
    'vue/component-definition-name-casing': ['error', 'PascalCase'],
    'vue/component-api-style': ['error', ['script-setup']],
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/block-lang': [
      'error',
      {
        script: {
          lang: 'ts',
        },
      },
    ],
    'vue/define-macros-order': [
      'error',
      {
        order: ['defineProps', 'defineEmits'],
      },
    ],

    'no-console': [
      'error',
      {
        allow: ['warn', 'error'],
      },
    ],
  },
}
