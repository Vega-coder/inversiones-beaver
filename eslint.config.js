import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]', argsIgnorePattern: '^[A-Z_]', caughtErrors: 'none' }],
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
  {
    // Regla de Clean Architecture: el dominio es JS puro sin frameworks.
    files: ['src/domain/**/*.js'],
    rules: {
      'no-restricted-imports': ['error', {
        patterns: [
          { group: ['react', 'react-*'], message: 'El dominio debe ser JS puro, sin frameworks.' },
          { group: ['@/application/*', '@/infrastructure/*', '@/presentation/*'], message: 'El dominio no puede depender de capas externas.' },
        ],
      }],
    },
  },
  {
    // Los casos de uso solo dependen del dominio.
    files: ['src/application/**/*.js'],
    rules: {
      'no-restricted-imports': ['error', {
        patterns: [
          { group: ['react', 'react-*'], message: 'Los casos de uso no conocen frameworks.' },
          { group: ['@/infrastructure/*', '@/presentation/*'], message: 'La aplicación no puede depender de infraestructura ni de la UI.' },
        ],
      }],
    },
  },
  {
    files: ['src/**/*.test.js'],
    languageOptions: { globals: { ...globals.node } },
  },
]);
