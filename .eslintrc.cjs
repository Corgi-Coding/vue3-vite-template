module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'standard-with-typescript',
    'plugin:prettier/recommended' // 添加 prettier 插件
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint', '.vue'],
  rules: {
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/triple-slash-reference': 'off', // 允许三斜线
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    'no-unused-vars': 'off',
    'import/no-unresolved': 0,
    'import/extensions': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/no-multiple-template-root': 'off', // 关闭多根节点的校验
    'linebreak-style': ['off', 'windows'], // 关闭由于 LF 导致的报错
    'no-console': 'warn', // 生产环境禁用consele
    'no-debugger': 'warn', // 生产环境禁用debugger
    '@typescript-eslint/no-explicit-any': [
      // 允许使用 any
      'off'
    ],
    'no-use-before-define': 'off', // 禁止未使用前定义
    camelcase: [0, { properties: 'never' }],
    'no-param-reassign': [
      // 允许部分变量的传参修改
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: [
          'data',
          'e', // for e.returnvalue
          'ctx', // for Koa routing
          'req', // for Express requests
          'request', // for Express requests
          'res', // for Express responses
          'response', // for Express responses
          'state' // for vuex state
        ]
      }
    ]
  }
};
