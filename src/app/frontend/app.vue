<template>
  <div class="LayoutWrapper">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useBreakpoints } from '~/composables/useBreakpoints'

const { breakpoints } = useBreakpoints()
const { $const } = useNuxtApp()
const config = useRuntimeConfig()
const { siteName, rootDir } = config.public
const utils = useUtils()
const route = useRoute()
const currentPath = ref<string>(route.path)

// ビューポート
const viewport = computed(() => {
  let result: string = 'width=device-width, initial-scale=1.0, minimum-scale=1.0, shrink-to-fit=no, viewport-fit=cover'

  if (breakpoints.value.isBreakpoint.xxs) {
    result = `width=${breakpoints.value.breakpoint.xs}`
  }

  return result
})

// ブレイクポイントの各判定をセットする処理
const setCurrentBreakPoint = (target: string) => {
  Object.keys(breakpoints.value.isBreakpoint).forEach((key: string) => {
    if (key === target) {
      breakpoints.value.isBreakpoint[key] = true
    } else {
      breakpoints.value.isBreakpoint[key] = false
    }
  })
}

// ブレイクポイントを判定する処理
const checkBreakPointXxs = (e: any): void => {
  if (e.matches) {
    setCurrentBreakPoint('xxs')
  }
}
const checkBreakPointXs = (e: any): void => {
  if (e.matches) {
    setCurrentBreakPoint('xs')
  }
}
const checkBreakPointSm = (e: any): void => {
  if (e.matches) {
    setCurrentBreakPoint('sm')
  }
}
const checkBreakPointMd = (e: any): void => {
  if (e.matches) {
    setCurrentBreakPoint('md')
  }
}
const checkBreakPointLg = (e: any): void => {
  if (e.matches) {
    setCurrentBreakPoint('lg')
  }
}
const checkBreakPointXl = (e: any): void => {
  if (e.matches) {
    setCurrentBreakPoint('xl')
  }
}
const checkBreakPointXxl = (e: any): void => {
  if (e.matches) {
    setCurrentBreakPoint('xxl')
  }
}

// Google広告用のJSを読み込む処理
const loadAdsense = () => {
  // 処理を削除
  window.removeEventListener('scroll', loadAdsense, false)

  // 画面遷移をしていない場合
  if (!utils.vars.value.isPageTransitionFirstTime) {
    // Google広告用のJSを生成
    const adsenseScript = document.createElement('script')
    adsenseScript.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${$const.adsId}`
    adsenseScript.async = true
    adsenseScript.crossOrigin = 'anonymous'
    adsenseScript.addEventListener('load', loadedAdsense)
    document.head.appendChild(adsenseScript)
  } else {
    // 画面遷移している場合
    utils.vars.value.isAdsenseLoaded = true
  }
}

// Google広告用のJSを読み込む処理
const loadedAdsense = () => {
  utils.vars.value.isAdsenseLoaded = true
}

onMounted(() => {
  // ブレイクポイント判定
  const matchMediaXxs: MediaQueryList = window.matchMedia(
    `screen and (max-width: ${breakpoints.value.breakpoint.xs - 1}px)`
  )
  const matchMediaXs: MediaQueryList = window.matchMedia(
    `screen and (min-width: ${breakpoints.value.breakpoint.xs}px) and (max-width: ${
      breakpoints.value.breakpoint.sm - 1
    }px)`
  )
  const matchMediaSm: MediaQueryList = window.matchMedia(
    `screen and (min-width: ${breakpoints.value.breakpoint.sm}px) and (max-width: ${
      breakpoints.value.breakpoint.md - 1
    }px)`
  )
  const matchMediaMd: MediaQueryList = window.matchMedia(
    `screen and (min-width: ${breakpoints.value.breakpoint.md}px) and (max-width: ${
      breakpoints.value.breakpoint.xl - 1
    }px)`
  )
  const matchMediaLg: MediaQueryList = window.matchMedia(
    `screen and (min-width: ${breakpoints.value.breakpoint.lg}px) and (max-width: ${
      breakpoints.value.breakpoint.xl - 1
    }px)`
  )
  const matchMediaXl: MediaQueryList = window.matchMedia(
    `screen and (min-width: ${breakpoints.value.breakpoint.xl}px) and (max-width: ${
      breakpoints.value.breakpoint.xxl - 1
    }px)`
  )
  const matchMediaXxl: MediaQueryList = window.matchMedia(
    `screen and (min-width: ${breakpoints.value.breakpoint.xxl}px)`
  )

  // ブレイクポイントの瞬間に発火
  matchMediaXxs.addEventListener('change', checkBreakPointXxs)
  matchMediaXs.addEventListener('change', checkBreakPointXs)
  matchMediaSm.addEventListener('change', checkBreakPointSm)
  matchMediaMd.addEventListener('change', checkBreakPointMd)
  matchMediaLg.addEventListener('change', checkBreakPointLg)
  matchMediaXl.addEventListener('change', checkBreakPointXl)
  matchMediaXxl.addEventListener('change', checkBreakPointXxl)

  // 初回チェック
  checkBreakPointXxs(matchMediaXxs)
  checkBreakPointXs(matchMediaXs)
  checkBreakPointSm(matchMediaSm)
  checkBreakPointMd(matchMediaMd)
  checkBreakPointLg(matchMediaLg)
  checkBreakPointXl(matchMediaXl)
  checkBreakPointXxl(matchMediaXxl)

  // Google広告用のJSを読み込む処理を設定
  window.addEventListener('scroll', loadAdsense, false)
})

watch(route, () => {
  if (route.path !== currentPath.value) {
    utils.vars.value.isPageTransitionFirstTime = true
  }
  currentPath.value = route.path
})

useHead({
  htmlAttrs: {
    lang: 'ja',
    prefix: 'og: http://ogp.me/ns#',
  },
  /*
  titleTemplate: (pageTitle) => {
    return pageTitle ? `${pageTitle}:${siteName}` : `${siteName}|市川市若宮の整形外科･リハビリテーション科・一般内科`
  },
  */
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
      key: 'ogType',
      property: 'og:type',
      content: 'website',
    },
    {
      key: 'ogSiteName',
      property: 'og:site_name',
      content: siteName,
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'theme-color',
      content: '#000911',
    },
  ],
  link: [
    {
      rel: 'icon',
      href: `${rootDir}/favicon.ico`,
    },
    {
      rel: 'apple-touch-icon',
      href: `${rootDir}/assets/img/favicon_180.png`,
    },
  ],
})
</script>

<style lang="scss" scoped>
@use '~/assets/_scss/_global/index' as g;

.AnimationPage {
  &-enter-active {
    transition: 0s all;
  }

  &-leave-active {
    transition: 0.6s opacity, 0.6s filter;
  }

  &-leave-to {
    opacity: 0 !important;
    filter: blur(20px) !important;
  }

  &-leave-from {
    opacity: 1 !important;
    filter: blur(0) !important;
  }
}
</style>
