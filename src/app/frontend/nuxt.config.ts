// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
import svgLoader from 'vite-svg-loader'

const now: Date = new Date()
const nowDatetime: string =
  now.getFullYear() +
  ('0' + (now.getMonth() + 1)).slice(-2) +
  ('0' + now.getDate()).slice(-2) +
  ('0' + now.getHours()).slice(-2) +
  ('0' + now.getMinutes()).slice(-2) +
  ('0' + now.getSeconds()).slice(-2)
const cashBuster: string = 'ver=' + nowDatetime
const lastmod: string =
  now.getFullYear() +
  '-' +
  ('0' + (now.getMonth() + 1)).slice(-2) +
  '-' +
  ('0' + now.getDate()).slice(-2) +
  'T' +
  ('0' + now.getHours()).slice(-2) +
  ':' +
  ('0' + now.getMinutes()).slice(-2) +
  ':' +
  ('0' + now.getSeconds()).slice(-2) +
  '+09:00'

const siteName = process.env.APP_SITE_NAME ?? 'AfterWorks.（開発）'
const rootDir = process.env.ROOT_DIR ?? ''
const staticImageDir = `${process.env.ROOT_DIR ?? ''}/assets/img`

export default defineNuxtConfig({
  ssr: true,
  rootDir,
  nitro: {
    preset: 'node-server',
  },
  typescript: {
    strict: true,
  },
  app: {
    head: {
      charset: 'utf-8',
      meta: [
        {
          name: 'format-detection',
          content: 'telephone=no',
        },
      ],
    },
  },
  css: ['@/assets/css/common.scss'],
  build: {
    transpile: ['@urql/vue'],
  },
  vite: {
    server: {
      proxy: {
        // CMSからアップロードした静的ファイル
        '/uploads': process.env.API_URL + 'uploads',
      },
    },
    plugins: [
      svgLoader({
        svgo: false,
      }),
    ],
    build: {
      assetsInlineLimit: 0,
    },
  },
  runtimeConfig: {
    // sitemap.xmlに使用する最終更新時刻
    lastmod,
    sendMailApiKey: process.env.SEND_MAIL_API_KEY,
    public: {
      // ルートディレクトリ
      rootDir,
      // 画像ディレクトリ
      staticImageDir,
      // キャッシュバスター
      cashBuster,
      // サイト名
      siteName,
      // サイトURL
      siteUrl: process.env.SITE_URL ?? 'http://localhost:3000',
      // APIURL
      apiUrl: process.env.API_URL ?? 'http://localhost:1337',
      // APIルート
      apiRoot: process.env.API_ROOT ?? '/graphql',
      // Google Analytics
      googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID ?? 'G-EVJ87DWEB6',
    },
  },
})
