module.exports = {
  settings: {
    'import/internal-regex': '(^@eduzz|react|^@nestjs|^~)'
  },
  plugins: ['prettier', 'eslint-plugin-unused-imports', 'react', 'react-hooks', 'react-native'],
  extends: [
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parserOptions: {
    ecmaVersion: 10,
    sourceType: 'module',
    ecmaFeatures: { modules: true, jsx: true }
  },
  rules: {
    'react-native/no-inline-styles': ['warn'],
    'react-native/no-unused-styles': ['error'],
    'no-restricted-globals': ['error'],
    'no-restricted-imports': [
      'error',
      'date-fns',
      'mdi-react',
      'lodash',
      '@material-ui/core',
      '@material-ui/styles',
      '@mui/material',
      '@mui/system',
      '@mui/styles',
      '@eduzz/houston-icons'
    ],
    'linebreak-style': ['error', 'unix'],
    'max-lines': ['error', 300],
    'max-len': ['off'],
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'no-trailing-spaces': ['error'],
    'prefer-const': ['error', { destructuring: 'all' }],
    'no-extra-semi': ['error'],
    'no-var': ['error'],
    quotes: ['error', 'single', { avoidEscape: true }],
    eqeqeq: 0,
    'quote-props': 'off',
    'no-useless-escape': 'off',
    'unused-imports/no-unused-imports-ts': 'error',
    'import/no-unresolved': 'off',
    'import/named': 'off',
    'import/namespace': 'off',
    'import/default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/no-named-as-default': 'off',
    'import/no-cycle': 'off',
    'import/no-deprecated': 'off',
    'import/no-unused-modules': 'off',
    'import/newline-after-import': 'error',
    'import/first': 'error',
    'import/order': [
      'error',
      {
        alphabetize: { order: 'asc', caseInsensitive: true },
        groups: ['builtin', ['external', 'internal'], ['parent', 'sibling', 'index'], 'object'],
        'newlines-between': 'always',
        pathGroups: [
          { pattern: 'react', group: 'external', position: 'before' },
          { pattern: '@nestjs/**', group: 'external', position: 'before' },
          { pattern: '@eduzz/**', group: 'internal', position: 'after' },
          { pattern: '~/**', group: 'internal', position: 'after' }
        ]
      }
    ],
    'react/display-name': ['off'],
    'react/prop-types': ['off'],
    'react/no-unescaped-entities': ['off'],
    'react-hooks/rules-of-hooks': 'error',
    'react/style-prop-object': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-unused-vars': ['warn'],
    '@typescript-eslint/adjacent-overload-signatures': ['error'],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: { regex: '^I[A-Za-z]', match: true }
      }
    ],
    '@typescript-eslint/no-namespace': ['error'],
    '@typescript-eslint/no-require-imports': ['error'],
    '@typescript-eslint/no-object-literal-type-assertion': 'off',
    '@typescript-eslint/no-useless-constructor': 'error',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'off' }]
  }
};
