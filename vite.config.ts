import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
import { viteMockServe } from 'vite-plugin-mock';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.join(__dirname, './src')
    }
  },
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://'
  //     }
  //   }
  // },
  plugins: [vue(), viteMockServe({
    mockPath: './mock',
    localEnabled: true, // 开发打包开关
    prodEnabled: false, // 生产打包开关
    supportTs: true, // 打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件。
    watchFiles: true // 监视文件更改
  })],
})
