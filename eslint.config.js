import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      semi: ['error', 'always'],
      eqeqeq: ['error', 'always'],
      'no-param-reassign': [2, { props: true }],
      'padding-line-between-statements': [
        2,
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var'],
        },
        { blankLine: 'always', prev: 'directive', next: '*' },
        { blankLine: 'always', prev: 'block-like', next: '*' },
      ],

      'react/prop-types': 0,
      'react/require-default-props': 0,
      'import/prefer-default-export': 0,
      'standard/no-callback-literal': 0,
      'react/destructuring-assignment': 0,
      'react/jsx-props-no-spreading': 0,
      'react-hooks/rules-of-hooks': 2,
    },
  },
);
