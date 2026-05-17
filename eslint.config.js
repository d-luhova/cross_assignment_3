const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  require('eslint-config-prettier'),
  {
    plugins: ['prettier'],
    rules: {
      'prettier/prettier': 'warn',
    },
    ignores: ['dist/*'],
  },
]);