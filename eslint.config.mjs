// @ts-check
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import importX from 'eslint-plugin-import-x';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/**
 * Domain (baseball) code must never be imported from generic code.
 * Generic code lives in `core/` and `common/`; domain code in `modules/`,
 * `features/` and the rules package. Keeping this boundary makes it possible
 * to extract the generic part into a reusable starter later.
 */
const domainImportPatterns = [
  {
    group: ['**/modules/**', '**/features/**', '@baseball-tournaments/rules', '@baseball-tournaments/rules/**'],
    message: 'Generic code (core/, common/) must not import domain code. See docs/decisions (generic/domain boundary).',
  },
  {
    group: ['@baseball-tournaments/contracts/baseball', '@baseball-tournaments/contracts/baseball/**'],
    message: 'Generic code must only use the core part of the contracts.',
  },
];

export default defineConfig(
  globalIgnores(['**/node_modules/', '**/dist/', '**/build/', '**/coverage/', '**/*.tsbuildinfo']),

  js.configs.recommended,

  {
    name: 'project/typescript',
    files: ['**/*.{ts,tsx,mts,cts}'],
    extends: [tseslint.configs.strictTypeChecked, tseslint.configs.stylisticTypeChecked],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unsafe-argument': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },
  },

  {
    name: 'project/imports',
    files: ['**/*.{ts,tsx,mts,cts,js,mjs,cjs}'],
    plugins: { 'import-x': importX },
    rules: {
      // npm hoists packages, so an undeclared dependency would still resolve locally.
      // This rule makes every workspace declare what it imports.
      'import-x/no-extraneous-dependencies': 'error',
      'import-x/no-duplicates': 'error',
    },
  },

  {
    name: 'project/generic-domain-boundary',
    files: ['**/core/**/*.{ts,tsx}', '**/common/**/*.{ts,tsx}', 'packages/contracts/src/core/**/*.ts'],
    rules: {
      '@typescript-eslint/no-restricted-imports': ['error', { patterns: domainImportPatterns }],
    },
  },

  {
    name: 'project/config-files',
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: { globals: { ...globals.node } },
  },

  prettier,
);
