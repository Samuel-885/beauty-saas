import prettier from 'eslint-config-prettier/flat';

// As regras de framework e a resolução do projeto permanecem nas aplicações.
export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/out/**',
      '**/.next/**',
      '**/coverage/**',
      '**/*.tsbuildinfo',
    ],
  },
  prettier,
];
