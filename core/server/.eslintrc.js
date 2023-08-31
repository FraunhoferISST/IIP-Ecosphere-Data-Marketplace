module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
  },
  plugins: ["prettier"],
  extends: ["airbnb-base", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "max-len": ["error", { code: 120 }],
    "prettier/prettier": ["error"],
    "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "no-underscore-dangle": "off",
  },
};
