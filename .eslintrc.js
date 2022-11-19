const airbnbBase = require('eslint-config-airbnb-base/rules/best-practices');

// Note: EsLint does not appear to support full glob patterns.
const testFilePattern = [
  '**/*.spec.ts',
  '**/*.spec.tsx',
];

module.exports = {
  extends: [
    'airbnb',
    'airbnb-typescript',
    'prettier',
  ],
  parserOptions: { project: './tsconfig.eslint.json' },
  ignorePatterns: ['*.js'],
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  plugins: [
    'react',
    'react-hooks',
    'prettier',
    'jest',
    '@emotion'
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    "react/no-unknown-property": ["error", { "ignore": ["css"] }],
    'linebreak-style': ['error', 'unix'],
    'prettier/prettier': [
      'error',
      {
        'endOfLine': 'lf',
      }
    ],
    'consistent-return': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'react/no-array-index-key': 'off',
    // transitional rules (will be fixed in future)
    'react/no-find-dom-node': 'warn',

    // disabled rules (should be considered for inclusion)
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
    '@typescript-eslint/no-unused-expressions': [
      'error',
      { allowShortCircuit: true, allowTernary: true },
    ],
    'class-methods-use-this': 'warn',
    'prefer-destructuring': 'off',
    'react/destructuring-assignment': 'off',
    'react/require-default-props': 'off',
    'react/button-has-type': 'off',
    'react/forbid-prop-types': 'warn',
    'react/jsx-props-no-spreading': 'warn',
    'react/static-property-placement': ['error', 'static public field'],
    // remove 'Use the exponentiation operator (**) instead.' rule
    'prefer-exponentiation-operator': 'off',
    'no-restricted-properties': airbnbBase.rules[
      'no-restricted-properties'
    ].filter(item => item.object !== 'Math' && item.property !== 'pow'),
    // allow either nesting or htmlFor
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        assert: 'either',
        depth: 25, // max
      },
    ],
    // This rule results in a lot of false positives
    // See https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unused-prop-types.md#false-positives-sfc
    'react/no-unused-prop-types': 'off',

    // demoted to warnings (currently not considered an error)
    'import/prefer-default-export': 'warn',

    // added because airbnb is on v1 of hooks rules
    'react-hooks/rules-of-hooks': 'error',

    'react-hooks/exhaustive-deps': 'error',

    'jest/no-focused-tests': 'error',

    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', '.tsx'] },
    ],

    // Allow stories to import dev-dependencies
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: testFilePattern,
      },
    ],

    // AirBnB's base rules don't recognise imports
    // without a .tsx, .ts extension. Override here.
    // See: https://stackoverflow.com/questions/59265981/typescript-eslint-missing-file-extension-ts-import-extensions
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
      },
    ],

    // Allow require statements
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': 'off',

    // Allows us to access computed namespace member references
    'import/namespace': ['error', { allowComputed: true }],

    // Allows us to omit propTypes in `.tsx` files and not get a warning if we've added
    // type declarations for props
    'react/prop-types': ['error', { skipUndeclared: true }],

    // TODO [Kesupile Kesupile 22 April 2020]: Extend AirBnb's TS rules
    // See https://apperio.atlassian.net/browse/APP-11465
    '@typescript-eslint/no-unused-vars': 'error',

    'react/sort-comp': 0,

    // TODO [Kesupile Kesupile 24 April 2020]: Maybe AirBnB has this as a rule
    // See above comment. If not, turn it off. TS can infer function return types
    // in most cases
    '@typescript-eslint/explicit-function-return-type': 'off',

    'import/order': 0,
    'sort-imports': 0,

    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],

    'no-promise-executor-return': 0,

    // Override https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/es6.js
    'no-restricted-exports': [
      'error',
      {
        restrictedNamedExports: [
          'then', // this will cause tons of confusion when your module is dynamically `import()`ed, and will break in most node ESM versions
        ],
      },
    ],
  },
  globals: {
    // See https://github.com/typescript-eslint/typescript-eslint/issues/2477#issuecomment-686892459
    JSX: 'readonly',
  },
  overrides: [
    {
      files: ['**/*.tsx'],
      rules: {
        'react/jsx-props-no-spreading': 'off',
        'react/default-props-match-prop-types': 'off',
        'react/prop-types': 'off',
      },
    },
    {
      files: ['*.jsx'],
      rules: {
        // exception for deprecated react lifecycle methods
        camelcase: ['error', { allow: ['^UNSAFE_'] }],
      },
    },
    {
      files: testFilePattern,
      globals: {
        describe: 'readonly',
        it: 'readonly',
        shallow: 'readonly',
        mount: 'readonly',
        render: 'readonly',
        automation: 'readonly',
        clearAllFeatureState: 'readonly',
      },
      rules: {
        'jest/no-disabled-tests': 'warn',
        'jest/no-identical-title': 'error',
        'jest/valid-expect': 'error',
        // aliases still trigger extension warnings
        'import/extensions': ['off'],
      },
    },
  ],
};
