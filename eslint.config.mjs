import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  {
    rules: {
      quotes: ['error', 'single'], // Enforce single quotes
      'comma-dangle': ['error', 'always-multiline'], // Enforce trailing commas for multiline
      semi: ['error', 'always'], // Enforce semicolons
      'func-names': ['warn', 'always'], // Enforce named functions
      'no-shadow': ['error'], // Disallow variable shadowing
      'arrow-body-style': ['error', 'as-needed'], // Enforce consistent arrow function bodies
      'no-async-promise-executor': ['error'], // Disallow async promise executors
      'object-curly-spacing': ['error', 'always'], // Enforce consistent spacing inside braces
      'no-unused-vars': ['error'], // Disallow unused variables
      eqeqeq: ['error', 'always'], // Enforce strict equality
      'no-multiple-empty-lines': ['error', { max: 1 }], // Disallow multiple empty lines
      'padded-blocks': ['error', 'never'], // Disallow padding within blocks
      'class-methods-use-this': ['error'], // Enforce 'this' usage within class methods
    },
  },
];
