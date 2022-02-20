import { defineNuxtPlugin } from '#app';
import VueTag from 'vue-gtag';

// Nuxtプラグインの登録
export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  // ルーター取得
  const router = useRouter();

  // 測定設定
  const googleAnalyticsConfig = {
    id: config.googleAnalyticsId,
  };

  // Vue登録
  nuxtApp.vueApp.use(VueTag, { config: googleAnalyticsConfig }, router);
});
