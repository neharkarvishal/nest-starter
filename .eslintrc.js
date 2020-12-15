module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module',
    },
    plugins: [
        'eslint-plugin-import-helpers',
        'security',
        '@typescript-eslint/eslint-plugin',
    ],
    extends: [
        // 'plugin:jest/all',
        'plugin:@typescript-eslint/recommended',
        'airbnb-typescript/base',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
        'prettier',
        'prettier/@typescript-eslint',
    ],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0, maxBOF: 0 }],
        'no-console': ['warn', { allow: ['info', 'warn', 'error'] }],
        'class-methods-use-this': 'off',
        'no-underscore-dangle': 'off',
        'jest/expect-expect': 'off',
        // 'function-paren-newline': ['error', { minItems: 2 }],
        // 'sort-imports': [
        //     'warn',
        //     {
        //         ignoreCase: true,
        //         ignoreDeclarationSort: true,
        //     },
        // ],
        'import-helpers/order-imports': [
            'warn',
            {
                alphabetize: {
                    ignoreCase: true,
                    order: 'asc',
                },
                groups: [
                    'absolute', // any absolute path modules are first (ex: `/path/to/code.ts`)
                    '/^@nest/', // any import paths starting with 'nest'
                    '/^nest/', // any import paths starting with 'nest'
                    '/^src/',
                    'module',
                    ['parent', 'sibling', 'index'],
                ],
                newlinesBetween: 'always',
            },
        ],
        'no-use-before-define': ['error', { variables: false }],
        'import/prefer-default-export': 'off',
    },
}
