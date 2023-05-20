// eslint-disable-next-line no-undef
module.exports = {
  env: {browser: true, es2020: true},
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/react',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {ecmaVersion: 'latest', sourceType: 'module'},
  settings: {
    react: {version: '18.2'},
    'import/extensions': ['.js', '.jsx'],
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx'],
      },
    },
  },
  plugins: ['import', 'react-refresh', 'filenames'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'filenames/match-regex': ['error', '^[0-9a-z-.]+$'],
    'react/prop-types': 'off',
  },
}
