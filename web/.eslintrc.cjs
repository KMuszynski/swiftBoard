// eslint-disable-next-line no-undef
module.exports = {
  env: {browser: true, es2020: true},
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {ecmaVersion: 'latest', sourceType: 'module'},
  plugins: ['filenames', 'import', 'react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'filenames/match-regex': ['error', '^[0-9a-z-.]+$'],
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
      },
    },
    react: {
      version: 'detect',
    },
  },
}
