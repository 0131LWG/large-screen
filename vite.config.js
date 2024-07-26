import { fileURLToPath, URL } from "node:url"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import postCssPxToRem from "postcss-pxtorem"

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "./dist"
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  // scss 全局变量的配置
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true
        // additionalData: '@import "./src/styles/variable.scss";'
      }
    },
    postcss: {
      plugins: [
        postCssPxToRem({
          // 自适应，px>rem转换
          rootValue: 192,
          propList: ["*"], // 需要转换的属性，这里选择全部都进行转换
          selectorBlackList: ["norem"] // 过滤掉norem-开头的class，不进行rem转换，这个内容可以不写
        })
      ]
    }
  },
  server: {
    port: 5173,
    host: '0.0.0.0', 
    cors: false, 
    proxy: {
      '/dev': {
        target: 'http://101.200.243.192:624', // 代理接口
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dev/, '')
      }
    }
  }
})
