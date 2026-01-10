import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import typescript from '@vue/eslint-config-typescript'
import prettier from '@vue/eslint-config-prettier'

export default [
  js.configs.recommended,
  ...vue.configs['flat/recommended'],
  typescript(),
  prettier,
  {
    files: ['**/*.{js,mjs,ts,mts,vue}'],
    rules: {
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    }
  },
  {
    ignores: [
      'dist/',
      '.vitepress/dist/',
      '.vitepress/cache/',
      'node_modules/'
    ]
  }
]
