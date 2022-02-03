import { defineNuxtConfig } from 'nuxt3';
import $const from './config/const';

let baseDir = '/';

const now = new Date();
const nowDatetime =
  now.getFullYear() +
  ('0' + (now.getMonth() + 1)).slice(-2) +
  ('0' + now.getDate()).slice(-2) +
  ('0' + now.getHours()).slice(-2) +
  ('0' + now.getMinutes()).slice(-2) +
  ('0' + now.getSeconds()).slice(-2);
const cashBuster = 'ver=' + nowDatetime;

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  publicRuntimeConfig: {
    // ルートディレクトリ
    baseDir,
    // キャッシュバスター
    cashBuster,
    // サイトURL
    siteUrl: process.env.SITE_URL,
  },
  typescript: {
    strict: true,
  },
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
  },
});
