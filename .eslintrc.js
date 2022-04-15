module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/explicit-module-boundary-types': "off",
    "@typescript-eslint/no-explicit-any": ["off"],
    "no-trailing-spaces": 1,//一行结束后面不要有空格
    "no-extra-semi": 2,//禁止多余的冒号
    "prettier/prettier": [
      // eslint校验不不成功后配置提示等级，配置error或2则报错，warn或1则警告，off或0则⽆无提示
      "error",//2,
      //然后我们加两个配置singleQuote表示使用单引号,semi设为false表示代码尾部不加  ";"
      {
        singleQuote: true,
        semi: false
      }
    ]
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        mocha: true,
      },
    },
  ],
};
