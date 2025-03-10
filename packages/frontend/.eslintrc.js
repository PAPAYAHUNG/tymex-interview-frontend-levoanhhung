module.exports = {
  extends: [
    // ... your existing extends
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:css-modules/recommended',
  ],
  plugins: [
    // ... your existing plugins
    'import',
    'css-modules'
  ],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.css'],
    'css-modules': {
      camelCase: true,
    },
  },
  rules: {
    // ... your existing rules
    'import/no-unresolved': 'error',
    'import/named': 'error',
    'import/default': 'error',
    'import/namespace': 'error',
    'import/no-restricted-paths': ['error', {
      zones: [
        {
          target: './src',
          from: '.',
          except: ['./src'],
        },
      ],
    }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        css: 'ignorePackages',
      },
    ],
    'css-modules/no-unused-class': 'error',
    'css-modules/no-undef-class': 'error',
  },
}; 