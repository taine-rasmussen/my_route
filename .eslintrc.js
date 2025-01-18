module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react-native/all',
      'plugin:@typescript-eslint/recommended',
      'prettier',
      'plugin:prettier/recommended',
    ],
    plugins: ['react', 'react-native', '@typescript-eslint', 'prettier'],
    rules: {
        "parser": "@typescript-eslint/parser",
        "extends": [
          "plugin:@typescript-eslint/recommended"
        ],
        "rules": {
          "@typescript-eslint/no-unused-vars": "error",
          "no-unused-vars": "off"
        }
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    env: {
      'react-native/react-native': true,
      node: true,
    },
  };
  