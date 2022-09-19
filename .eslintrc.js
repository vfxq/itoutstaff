module.exports = {
  globals: {
    localStorage: true,
  },
  env: {
    node: true,
  },
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['airbnb', 'airbnb/hooks', 'plugin:@typescript-eslint/recommended', 'plugin:storybook/recommended'],
  rules: {
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'react/function-component-definition': [2, {
      namedComponents: 'arrow-function',
    }],
    'react/jsx-filename-extension': [1, {
      extensions: ['.tsx', '.jsx'],
    }],
    camelcase: 'off',
    'no-console': ['warn', {
      allow: ['warn', 'error', 'log'],
    }],
    'arrow-body-style': 'off',
    'no-return-assign': 'off',
    'no-restricted-exports': 'off',
    'global-require': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'react/jsx-props-no-spreading': 'off',
    'default-param-last': 'off',
    'no-shadow': 'off',
    'no-param-reassign': 'off',
    'react-hooks/exhaustive-deps': 'off',
  },
};
