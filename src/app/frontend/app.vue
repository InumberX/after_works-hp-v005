<template>
  <div class="l-wrapper">
    <Html lang="ja">
      <Head>
        <Meta name="viewport" :content="viewport" />
        <Meta name="format-detection" content="telephone=no" />
        <Meta name="og:type" content="website" />
        <Meta name="twitter:card" content="summary" />
        <Meta name="twitter:site" content="@InumberX" />
        <Meta name="theme-color" content="#002984" />
      </Head>
    </Html>
    <NuxtLayout>
      <CommonHeader />
      <NuxtPage />
      <CommonFooter />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useBreakpoints } from '~/composables/useBreakpoints';
const { breakpoints } = useBreakpoints();

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
});
</script>
