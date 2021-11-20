const path = require('path');

module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended'
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    babelOptions: {
      configFile: path.join(__dirname, '.babelrc')
    },
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  plugins: ['jsx-a11y', 'prettier', 'react', 'react-hooks'],
  root: true,
  rules: {
    'arrow-body-style': 'off',
    'comma-dangle': 'off',
    'function-paren-newline': 'off',
    'implicit-arrow-linebreak': 'off',
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    indent: 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'linebreak-style': 'off',
    'no-confusing-arrow': 'off',
    'no-console': 'off',
    'no-empty': 'off',
    'no-nested-ternary': 'off',
    'no-param-reassign': 'off',
    'no-undef': 'error',
    'no-unused-vars': 'warn',
    'no-unused-expressions': 'off',
    'object-curly-newline': 'off',
    'operator-linebreak': 'off',
    'react/jsx-curly-newline': 'off',
    'react/jsx-indent': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/no-did-update-set-state': 'off',
    'react/no-unused-state': 'off',
    'react/sort-comp': 'off'
  }
};
