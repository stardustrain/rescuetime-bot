module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }],
        'comma-dangle': ['warn', 'always-multiline'],
        'quotes': ['warn', 'single'],
        'semi': ['error', 'never'],
    }
};