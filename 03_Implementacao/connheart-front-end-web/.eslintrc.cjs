module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        "eslint-config-prettier"
    ],
    ignorePatterns: ['.eslintrc.cjs',  "node_modules/", "build/"],
    parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    settings: { react: { version: '18.2' } },
    plugins: ['react-refresh', 'react', "eslint-plugin-prettier", 'jsx-a11y'],
    rules: {
        "react/jsx-filename-extension": 0,
        "no-param-reassign": 0,
        "react/prop-types": 1,
        "react/require-default-props": 0,
        "react/no-array-index-key": 0,
        "react/jsx-props-no-spreading": 0,
        "react/forbid-prop-types": 0,
        "import/order": 0,
        "no-console": 0,
        "jsx-a11y/anchor-is-valid": 0,
        "prefer-destructuring": 0,
        "no-shadow": 0,
        "no-unused-vars": [
            1,
            {
                "ignoreRestSiblings": false
            }
        ],
        "prettier/prettier": [
            2,
            {
                "bracketSpacing": true,
                "printWidth": 140,
                "singleQuote": true,
                "trailingComma": "none",
                "tabWidth": 4,
                "useTabs": false,
                "endOfLine": "auto"
            }
        ]
    }
}
