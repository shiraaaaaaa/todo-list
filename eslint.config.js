import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import imports from 'eslint-plugin-import'

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
      import: imports,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'react-hooks/exhaustive-deps': 'off',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          'newlines-between': 'always-and-inside-groups',
          pathGroups: [
            {
              pattern: 'react',
              group: 'builtin',
              position: 'before',
            },
            {
              pattern: 'react-dom',
              group: 'builtin',
              position: 'before',
            },
            {
              pattern: '@mui**',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'react-router**',
              group: 'external',
              position: 'after',
            },
            {
              pattern: '**/hooks/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '**/components/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '**/helpers/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '**/utils/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '**/types/**',
              group: 'internal',
              position: 'after',
            },
          ],
          distinctGroup: true,
          pathGroupsExcludedImportTypes: [
            'react',
            'react-dom',
            '@mui/**',
            'axios',
            'react-router**',
            '**/utils/**',
            '**/hooks/**',
            '**/helpers/**',
            '**/types/**',
          ],
        },
      ],
    },
  },
)
