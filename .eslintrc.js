module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended", // recommended rules for react
        "plugin:@typescript-eslint/recommended", // recommended rules for typescript
        "prettier", // adds formatting support for prettier
        "plugin:jsdoc/recommended" // recommended rules for jsdoc
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest", // parses to latest version of ecmascript
        "sourceType": "module"
    },
    "plugins": [
        "react", // react
        "react-hooks",
        "@typescript-eslint", // ts support
        "prettier",
        "jsdoc" // jsdoc support
    ],
    "rules": {
        "semi": ["error", "always"], // enforces semicolons
        "react/react-in-jsx-scope": "off",
        "camelcase": "error",
        "spaced-comment": ["error", "always"], // errors if comments do not have spaces 
        "quotes": ["warn", "single", { "allowTemplateLiterals": true }], // enforces single quotes
        "no-duplicate-imports": "error",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
    },
    "settings": {
        "import/resolver": {
            "typescript": {}
        }
    }
}