module.exports = {
  root: true,
  extends: [
    '@react-native',
    'plugin:import/warnings',
    'plugin:jest/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jest'],
  rules: {
    'react-hooks/exhaustive-deps': 'off',
    'react-native/no-inline-styles': 'off',
    'prettier/prettier': ['error', {endOfLine: 'auto'}],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
  env: {
    'jest/globals': true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {},
    },
  },
};
