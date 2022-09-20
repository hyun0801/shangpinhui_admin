import { defineConfig, loadEnv, type ConfigEnv } from "vite";
import {resolve} from 'path'

import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
// https://vitejs.dev/config/
export default defineConfig((mode: ConfigEnv) => {
  const env = loadEnv(mode.mode, process.cwd());
  return {
    plugins: [vue(), vueJsx()],
    resolve: {
      // 配置路径别名
      alias: {
        '@': resolve(__dirname, "src"),
      },
      extensions: [".ts", ".vue", ".js", ".jsx", ".tsx"], // 导入时想要省略的扩展名列表。
    },
    css: {
      preprocessorOptions: {
        scss: {
          // 引入 var.scss 这样就可以在全局中使用 var.scss中预定义的变量了
          // 给导入的路径最后加上 ;
          additionalData: '@import "./src/styles/variables.scss";',
        },
      },
      postcss: {
        plugins: [
          {
            postcssPlugin: "internal:charset-removal",
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === "charset") {
                  atRule.remove();
                }
              },
            },
          },
        ],
      },
    },
    server:{
        proxy:{
            "/app-dev": {
                target: "http://gmall-h5-api.atguigu.cn", //目标服务器
                changeOrigin: true,//是否允许跨域
                rewrite: (path) => path.replace(/^\/app-dev/, ""),//是否需要路径重写,取决于接口地址中是否需要带
            }
        }
    }
  };
});
