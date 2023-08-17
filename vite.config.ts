import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import pxtovw from 'postcss-px-to-viewport'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  base: '/momotalk/',
  build: {
    outDir: 'docs'
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/css/mixin.scss";'
      }
    },
    // postcss: {
    //   plugins: [
    //     pxtovw({
    //       viewportWidth: 1627,
    //       viewportHeight: 1002,
    //       unitPrecision: 3,               // (Number) The decimal numbers to allow the REM units to grow to. 
    //       virwportUnit: 'vw',             // (String) Expected units. 
    //       selectorBlackList: ['.ignore'], // (Array) The selectors to ignore and leave as px. 
    //       minPixelVlaue: 1,               // (Number) Set the minimum pixel value to replace. 
    //       mediaQuery: false,
    //     })
    //   ]
    // }
  }
})