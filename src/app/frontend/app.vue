<template>
  <div class="l-wrapper">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { onBeforeRouteUpdate } from 'vue-router';
import { useBreakpoints } from '~/composables/useBreakpoints';
const { breakpoints } = useBreakpoints();
const { $const } = useNuxtApp();
const config = useRuntimeConfig();
const utils = useUtils();
const route = useRoute();
const currentPath = ref<string>(route.path);

// ビューポート
const viewport = computed(() => {
  let result: string =
    'width=device-width, initial-scale=1.0, minimum-scale=1.0, shrink-to-fit=no, viewport-fit=cover';

  if (breakpoints.value.flg.xxs) {
    result = `width=${breakpoints.value.point.xs}`;
  }

  return result;
});

// ブレイクポイントの各判定をセットする処理
const setCurrentBreakPoint = (target: string) => {
  Object.keys(breakpoints.value.flg).forEach((key: string) => {
    if (key === target) {
      breakpoints.value.flg[key] = true;
    } else {
      breakpoints.value.flg[key] = false;
    }
  });
};

// ブレイクポイントを判定する処理
const checkBreakPointXxs = (e: any): void => {
  if (e.matches) {
    setCurrentBreakPoint('xxs');
  }
};
const checkBreakPointXs = (e: any): void => {
  if (e.matches) {
    setCurrentBreakPoint('xs');
  }
};
const checkBreakPointSm = (e: any): void => {
  if (e.matches) {
    setCurrentBreakPoint('sm');
  }
};
const checkBreakPointMd = (e: any): void => {
  if (e.matches) {
    setCurrentBreakPoint('md');
  }
};
const checkBreakPointLg = (e: any): void => {
  if (e.matches) {
    setCurrentBreakPoint('lg');
  }
};
const checkBreakPointXl = (e: any): void => {
  if (e.matches) {
    setCurrentBreakPoint('xl');
  }
};
const checkBreakPointXxl = (e: any): void => {
  if (e.matches) {
    setCurrentBreakPoint('xxl');
  }
};

// Google広告用のJSを読み込む処理
const loadAdsense = () => {
  // 処理を削除
  window.removeEventListener('scroll', loadAdsense, false);

  // 画面遷移をしていない場合
  if (!utils.vars.value.isPageTransitionFirstTime) {
    // Google広告用のJSを生成
    const adsenseScript = document.createElement('script');
    adsenseScript.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${$const.adsId}`;
    adsenseScript.async = true;
    adsenseScript.crossOrigin = 'anonymous';
    adsenseScript.addEventListener('load', loadedAdsense);
    document.head.appendChild(adsenseScript);
  } else {
    // 画面遷移している場合
    utils.vars.value.isAdsenseLoaded = true;
  }
};

// Google広告用のJSを読み込む処理
const loadedAdsense = () => {
  utils.vars.value.isAdsenseLoaded = true;
};

onMounted(() => {
  // ブレイクポイント判定
  const matchMediaXxs: MediaQueryList = window.matchMedia(
    `screen and (max-width: ${breakpoints.value.point.xs - 1}px)`
  );
  const matchMediaXs: MediaQueryList = window.matchMedia(
    `screen and (min-width: ${breakpoints.value.point.xs}px) and (max-width: ${
      breakpoints.value.point.sm - 1
    }px)`
  );
  const matchMediaSm: MediaQueryList = window.matchMedia(
    `screen and (min-width: ${breakpoints.value.point.sm}px) and (max-width: ${
      breakpoints.value.point.md - 1
    }px)`
  );
  const matchMediaMd: MediaQueryList = window.matchMedia(
    `screen and (min-width: ${breakpoints.value.point.md}px) and (max-width: ${
      breakpoints.value.point.xl - 1
    }px)`
  );
  const matchMediaLg: MediaQueryList = window.matchMedia(
    `screen and (min-width: ${breakpoints.value.point.lg}px) and (max-width: ${
      breakpoints.value.point.xl - 1
    }px)`
  );
  const matchMediaXl: MediaQueryList = window.matchMedia(
    `screen and (min-width: ${breakpoints.value.point.xl}px) and (max-width: ${
      breakpoints.value.point.xxl - 1
    }px)`
  );
  const matchMediaXxl: MediaQueryList = window.matchMedia(
    `screen and (min-width: ${breakpoints.value.point.xxl}px)`
  );

  // ブレイクポイントの瞬間に発火
  matchMediaXxs.addEventListener('change', checkBreakPointXxs);
  matchMediaXs.addEventListener('change', checkBreakPointXs);
  matchMediaSm.addEventListener('change', checkBreakPointSm);
  matchMediaMd.addEventListener('change', checkBreakPointMd);
  matchMediaLg.addEventListener('change', checkBreakPointLg);
  matchMediaXl.addEventListener('change', checkBreakPointXl);
  matchMediaXxl.addEventListener('change', checkBreakPointXxl);

  // 初回チェック
  checkBreakPointXxs(matchMediaXxs);
  checkBreakPointXs(matchMediaXs);
  checkBreakPointSm(matchMediaSm);
  checkBreakPointMd(matchMediaMd);
  checkBreakPointLg(matchMediaLg);
  checkBreakPointXl(matchMediaXl);
  checkBreakPointXxl(matchMediaXxl);

  // Google広告用のJSを読み込む処理を設定
  window.addEventListener('scroll', loadAdsense, false);
});

watch(route, () => {
  if (route.path !== currentPath.value) {
    utils.vars.value.isPageTransitionFirstTime = true;
  }
  currentPath.value = route.path;
});

useMeta({
  htmlAttrs: {
    lang: 'ja',
    prefix: 'og: http://ogp.me/ns#',
  },
  meta: [
    {
      name: 'viewport',
      content: viewport,
    },
    {
      name: 'format-detection',
      content: 'telephone=no',
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:site_name',
      content: $const.meta.title,
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:site',
      content: '@InumberX',
    },
    {
      name: 'theme-color',
      content: '#002984',
    },
  ],
  link: [
    {
      rel: 'icon',
      href: `${config.baseDir}assets/img/favicon.ico`,
    },
    {
      rel: 'apple-touch-icon',
      href: `${config.baseDir}assets/img/favicon_180.png`,
    },
  ],
  script: [
    {
      src: `${config.baseDir}assets/js/smoothscroll.polyfill.min.js?${config.cashBuster}`,
      defer: true,
    },
  ],
});
</script>
