type CommonVars = {
  scrollPosition: number
  isAdsenseLoaded: boolean
  isPageTransitionFirstTime: boolean
}

export const useUtils = () => {
  const commonVars = useState<CommonVars>('commonVars', () => ({
    // スクロール位置
    scrollPosition: 0,
    // Google広告用のJSを読み込んだかどうか
    isAdsenseLoaded: false,
    // 画面遷移を一度でも行なったかどうか
    isPageTransitionFirstTime: false,
  }))

  return {
    vars: commonVars,
    // 親画面を固定する処理
    fixParentScreen: () => {
      commonVars.value.scrollPosition = window.pageYOffset || document.documentElement.scrollTop
      const body = document.body
      body.style.top = '-' + commonVars.value.scrollPosition + 'px'
      body.classList.add('Body--fixed')
    },
    // 親画面の固定を解除する処理
    unfixParentScreen: () => {
      const body = document.body
      body.classList.remove('Body--fixed')
      body.style.top = ''
      scrollTo(0, commonVars.value.scrollPosition)
      commonVars.value.scrollPosition = 0
    },
    // スムーススクロール
    actSmoothScroll: (target: string) => {
      const targetElm: HTMLBodyElement | null =
        target === '#' ? document.querySelector('body') : document.querySelector(target)

      // スクロール先が存在しない場合
      if (!targetElm) {
        return
      }

      const targetPosition: number = targetElm.getBoundingClientRect().top
      const winY: number = window.pageYOffset || document.documentElement.scrollTop
      const { breakpoints } = useBreakpoints()
      const { isBreakpoint } = breakpoints.value
      const staggerPosition = isBreakpoint.xxl || isBreakpoint.xl || isBreakpoint.lg ? 136 : isBreakpoint.md ? 120 : 96

      window.scrollTo({
        top: targetPosition + winY - staggerPosition,
        behavior: 'smooth',
      })
    },
    // エスケープを行う処理
    escape: (value: string): string => {
      return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/'/g, '&apos;')
        .replace(/"/g, '&quot;')
    },
    // 改行コードを置換する処理
    replaceNewLine: (value: string): string => {
      return value.replace(/\r?\n/g, '<br>')
    },
    // タイトルを取得する処理
    getTitleTemplate: (pageTitle?: string) => {
      const config = useRuntimeConfig()
      const { siteName } = config.public
      return pageTitle ? `${pageTitle} | ${siteName}` : `${siteName} - N/NE's Portfolio Site`
    },
    // ページの説明を取得する処理
    getDescription: (description?: string) => {
      const { $const } = useNuxtApp()
      return description ? description : $const.meta.defaultDescription
    },
    // OGイメージを取得する処理
    getOgImage: (url?: string) => {
      const config = useRuntimeConfig()
      const { siteUrl, staticImageDir } = config.public
      return url ? url : `${siteUrl}${staticImageDir}/img-ogp.png`
    },
  }
}
