import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const { resolve } = require('path')

export default defineConfig({
  base: './', //打包路径
  server: {
    host: '0.0.0.0',
    open: true
  },
  plugins: [vue()],
  build: {
    
  }
})
