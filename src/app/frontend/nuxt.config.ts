import { defineNuxtConfig } from 'nuxt3';
import $const from './config/const';

let baseDir = '/';

const now: Date = new Date();
const nowDatetime: string =
  now.getFullYear() +
  ('0' + (now.getMonth() + 1)).slice(-2) +
  ('0' + now.getDate()).slice(-2) +
  ('0' + now.getHours()).slice(-2) +
  ('0' + now.getMinutes()).slice(-2) +
  ('0' + now.getSeconds()).slice(-2);
const cashBuster: string = 'ver=' + nowDatetime;

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  ssr: true,
  publicRuntimeConfig: {
    // ルートディレクトリ
    baseDir,
    // キャッシュバスター
    cashBuster,
    // サイトURL
    siteUrl: process.env.SITE_URL,
    // APIURL
    apiUrl: process.env.API_URL,
    // APIルート
    apiRoot: process.env.API_ROOT,
    // Google Analytics
    googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,
  },
  typescript: {
    strict: true,
  },
  css: ['@/assets/css/common.scss'],
  build: {
    extractCSS: true,
    filenames: {
      app: () => 'js/[name].js?' + cashBuster,
      chunk: () => 'js/[name].js?' + cashBuster,
      css: () => 'css/[name].css?' + cashBuster,
      img: () => 'img/[name].[ext]?' + cashBuster,
      font: () => 'font/[name].[ext]?' + cashBuster,
      video: () => 'video/[name].[ext]?' + cashBuster,
    },
    transpile: ['@urql/vue'],
  },
  vite: {
    server: {
      proxy: {
        // CMSからアップロードした静的ファイル
        '/uploads': process.env.API_URL + 'uploads',
      },
    },
  },
  nitro: {
    preset: 'server',
  },
});
