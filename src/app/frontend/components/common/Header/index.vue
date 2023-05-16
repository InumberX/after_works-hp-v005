<template>
  <header class="LayoutHeader">
    <div class="Header">
      <Inner class="Header__inner">
        <div class="Header__container">
          <div class="HeaderLogo">
            <NuxtLink :to="routes.top.url({})" class="HeaderLogo__link">
              <img
                :src="`${staticImageDir}/img-logo.svg?${cashBuster}`"
                :alt="siteName"
                class="HeaderLogo__image"
                width="160"
                height="28"
              />
            </NuxtLink>
          </div>

          <div class="HeaderMenu">
            <div class="HeaderMenuGlobal">
              <nav class="HeaderMenuGlobal__navigation">
                <ul class="HeaderMenuGlobal__items">
                  <li v-for="info in headerMenuGlobalInfos" :key="info.id" class="HeaderMenuGlobal__item">
                    <button
                      type="button"
                      class="HeaderMenuGlobal__link"
                      @click="
                        movePage({
                          url: info.url,
                          id: info.elmId,
                        })
                      "
                      event=""
                    >
                      <span class="HeaderMenuGlobal__text">
                        {{ info.menuText }}
                      </span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
            <div class="HeaderMenuButton">
              <button type="button" class="HeaderMenuButton__button" @click="toggleMenu">
                <span class="HeaderMenuButton__container">
                  <span class="HeaderMenuButton__icons">
                    <span class="HeaderMenuButton__icon" />
                    <span class="HeaderMenuButton__icon" />
                    <span class="HeaderMenuButton__icon" />
                  </span>
                  <span class="HeaderMenuButton__text"> メニュー </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </Inner>
    </div>
    <Transition
      name="AnimationHeaderMenuOuter"
      @beforeEnter="animationHeaderMenuOuterOnBeforeEnter"
      @afterLeave="animationHeaderMenuOuterOnAfterLeave"
    >
      <div v-if="isShowMenu" :class="['HeaderMenuOuter', isShowMenu ? 'HeaderMenuOuter--active' : '']">
        <div class="HeaderMenuOuter__container">
          <div class="HeaderMenuButton HeaderMenuOuterButton">
            <button type="button" class="HeaderMenuButton__button HeaderMenuButton__button--active" @click="hideMenu">
              <span class="HeaderMenuButton__container">
                <span class="HeaderMenuButton__icons">
                  <span class="HeaderMenuButton__icon" />
                  <span class="HeaderMenuButton__icon" />
                  <span class="HeaderMenuButton__icon" />
                </span>
                <span class="HeaderMenuButton__text">閉じる</span>
              </span>
            </button>
          </div>

          <div class="HeaderMenuOuter__contents">
            <div class="HeaderMenuOuterNavigation">
              <nav class="HeaderMenuOuterNavigation__container">
                <ul class="HeaderMenuOuterNavigation__items">
                  <li
                    v-for="(info, i) in headerMenuGlobalInfos"
                    :key="info.id"
                    class="HeaderMenuOuterNavigation__item JsHeaderMenuOuterNavigation__item"
                    :data-transition-index="i"
                  >
                    <button
                      type="button"
                      class="HeaderMenuOuterNavigation__link"
                      @click="
                        movePage({
                          url: info.url,
                          id: info.elmId,
                        })
                      "
                    >
                      <span class="HeaderMenuOuterNavigation__text">
                        {{ info.menuText }}
                      </span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </Transition>
    <Transition name="AnimationFade">
      <div v-if="isShowMenu" :class="['HeaderOverlay', isShowMenu ? 'HeaderOverlay--active' : '']" @click="hideMenu" />
    </Transition>
  </header>
</template>

<script setup lang="ts">
import Inner from '~/components/layout/Inner/index.vue'
import { routes } from '~/config/routes'

const nuxtRouter = useRouter()
const { actSmoothScroll, fixParentScreen, unfixParentScreen } = useUtils()
const config = useRuntimeConfig()
const { siteName, staticImageDir, cashBuster } = config.public
const { breakpoints } = useBreakpoints()

const headerMenuGlobalInfos: {
  id: string
  menuText: string
  url: string
  elmId?: string
}[] = [
  {
    id: routes.top.id,
    menuText: routes.top.menuText,
    url: routes.top.url({}),
  },
  {
    id: routes.blogs.id,
    menuText: routes.blogs.menuText,
    url: routes.blogs.url({}),
  },
  {
    id: routes.about.id,
    menuText: routes.about.menuText,
    url: routes.about.url({}),
  },
  {
    id: routes.works.id,
    menuText: routes.works.menuText,
    url: routes.works.url({}),
  },
  {
    id: routes.hobby.id,
    menuText: routes.hobby.menuText,
    url: routes.hobby.url({}),
  },
  {
    id: routes.contact.id,
    menuText: routes.contact.menuText,
    url: routes.contact.url({}),
  },
]

const isShowMenu = ref<boolean>(false)

const isShowSmallMenu = computed(() => {
  let result: boolean = false

  // 特定の画面幅以上の場合
  if (
    breakpoints.value.isBreakpoint.md ||
    breakpoints.value.isBreakpoint.lg ||
    breakpoints.value.isBreakpoint.xl ||
    breakpoints.value.isBreakpoint.xxl
  ) {
    result = true
  }

  return result
})

watch(isShowSmallMenu, (newValues: boolean, oldValues: boolean) => {
  hideMenu()
})

// メニューの表示非表示を切り替える処理
const toggleMenu = () => {
  // メニューが非表示の場合
  if (!isShowMenu.value) {
    // メニューを表示する
    showMenu()

    return
  }

  // メニューを非表示にする
  hideMenu()
}

// メニューを表示する処理
const showMenu = () => {
  isShowMenu.value = true
  fixParentScreen()
}

// メニューを非表示にする処理
const hideMenu = () => {
  isShowMenu.value = false
  unfixParentScreen()
}

const movePage = ({ url, id }: { url: string; id?: string }) => {
  const isDelay = isShowMenu.value

  if (isShowMenu.value) {
    hideMenu()
  }

  if (id && document.querySelector(`#${id}`)) {
    if (!isDelay) {
      actSmoothScroll(`#${id}`)
      return
    }

    setTimeout(() => {
      actSmoothScroll(`#${id}`)
    }, 610)
  } else {
    if (!isDelay) {
      nuxtRouter.push(url)
      return
    }

    setTimeout(() => {
      nuxtRouter.push(url)
    }, 310)
  }
}

const animationHeaderMenuOuterOnBeforeEnter = (el: Element) => {
  const items = el.querySelectorAll('.JsHeaderMenuOuterNavigation__item')

  for (let i = 0, iLength = items.length; i < iLength; i = i + 1) {
    const item = items[i]

    setTimeout(() => {
      item.classList.add('HeaderMenuOuterNavigation__item--active')
    }, (i + 1) * 200)
  }
}

const animationHeaderMenuOuterOnAfterLeave = (el: Element) => {
  const items = el.querySelectorAll('.JsHeaderMenuOuterNavigation__item')

  for (let i = 0, iLength = items.length; i < iLength; i = i + 1) {
    const item = items[i]

    item.classList.remove('HeaderMenuOuterNavigation__item--active')
  }
}
</script>

<style lang="scss" scoped>
@use '~/assets/_scss/_global/index' as *;

.LayoutHeader {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: $z-index-header-1;

  &:after {
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    position: absolute;
    left: 0;
    bottom: 0;
    background: linear-gradient(90deg, $gradation-primary);
  }
}

.Header {
  background-color: rgba($palette-blue-charcoal, 0.32);
  backdrop-filter: blur(20px);
}

.Header__container {
  display: flex;
  height: 64px;
}

.HeaderLogo {
  margin-right: 16px;
  flex-shrink: 0;
}

.HeaderLogo__link {
  &:not(:root) {
    display: flex;
    align-items: center;
    height: 100%;
    transition: 0.3s opacity;

    @include mxMediaHover {
      &:hover {
        opacity: $opacity-hover;
      }
    }
  }
}

.HeaderLogo__image {
  width: 160px;
  height: 28px;
}

.HeaderMenu {
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;
}

.HeaderMenuGlobal {
  display: none;

  @include mxMediaQueryMd {
    display: block;
  }
}

.HeaderMenuGlobal__navigation {
  height: 100%;
}

.HeaderMenuGlobal__items {
  display: flex;
  height: 100%;
}

.HeaderMenuGlobal__link {
  &:not(:root) {
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    padding: 16px 8px;
    position: relative;
    background-color: transparent;
    border: none;
    border-radius: 0;
    text-align: left;
    width: 100%;
    transition: 0.3s color, 0.3s text-shadow;
    font-weight: $font-bold;
    color: $palette-white;
    @include mxGetFontSize(14);
    min-width: 72px;
    height: 100%;

    @include mxMediaHover() {
      &:hover {
        color: $palette-sky-blue;
        text-shadow: 0px 0px 16px rgba($palette-sky-blue, 0.64), 0px 0px 16px rgba($palette-sky-blue, 0.64);
      }
    }
  }
}

.HeaderMenuButton {
  height: 100%;
  flex-shrink: 0;
  position: relative;
  z-index: $z-index-header-3;

  @include mxMediaQueryMd {
    display: none;
  }
}

.HeaderMenuButton__button {
  &:not(:root) {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 64px;
    height: 100%;
    border-radius: 0;
    border: none;
    background-color: transparent;
    padding: 0;
    @include mxGetFontSize(10);
    font-weight: $font-bold;

    @include mxMediaHover() {
      &:hover {
        .HeaderMenuButton__icon {
          box-shadow: 0px 0px 12px rgba($palette-sky-blue, 0.64), 0px 0px 12px rgba($palette-sky-blue, 0.64);
        }

        .HeaderMenuButton__text {
          text-shadow: 0px 0px 8px rgba($palette-sky-blue, 0.64), 0px 0px 8px rgba($palette-sky-blue, 0.64);
        }
      }
    }
  }
}

.HeaderMenuButton__button--active {
  &:not(:root) {
    .HeaderMenuButton__icons {
      > .HeaderMenuButton__icon {
        &:nth-of-type(1) {
          top: 6px;
          transform: rotate(-45deg);
        }
        &:nth-of-type(2) {
          opacity: 0;
        }
        &:nth-of-type(3) {
          bottom: 8px;
          transform: rotate(45deg);
        }
      }
    }
  }
}

.HeaderMenuButton__container {
  display: block;
}

.HeaderMenuButton__icons {
  display: block;
  position: relative;
  width: 24px;
  height: 16px;
  margin: 0 auto;

  > .HeaderMenuButton__icon {
    &:nth-of-type(1) {
      top: 0;
    }
    &:nth-of-type(2) {
      top: 50%;
      margin-top: -1px;
    }
    &:nth-of-type(3) {
      bottom: 0;
    }
  }
}

.HeaderMenuButton__icon {
  display: block;
  width: 100%;
  height: 2px;
  position: absolute;
  left: 0;
  transition: 0.3s all;
  border-radius: 40px;
  background: linear-gradient(90deg, $gradation-primary);
}

.HeaderMenuButton__text {
  display: block;
  background: linear-gradient(90deg, $gradation-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-top: 6px;
  transition: 0.3s text-shadow;
}

.HeaderMenuOuter {
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: $z-index-header-3;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 80px 0;
}

.HeaderMenuOuter--active {
  display: block;
}

.AnimationHeaderMenuOuter {
  &-leave-active {
    transition: 0.3s opacity;
  }
  &-leave-to {
    opacity: 0 !important;
  }
  &-leave-from {
    opacity: 1 !important;
  }
}

.HeaderMenuOuterButton {
  position: fixed;
  z-index: $z-index-header-4;
  top: 16px;
  right: 4vw;
  height: auto;

  @include mxMediaQuerySm {
    right: 4.6vw;
  }
}

.HeaderMenuOuterNavigation__item {
  opacity: 0;
  transform: translateY(20px);
  transition: 0.6s opacity, 0.6s transform;
}

.HeaderMenuOuterNavigation__item--active {
  opacity: 1;
  transform: translateY(0);
}

.HeaderMenuOuterNavigation__link {
  &:not(:root) {
    display: flex;
    justify-content: center;
    text-decoration: none;
    padding: 16px 4vw;
    position: relative;
    background-color: transparent;
    border: none;
    border-radius: 0;
    text-align: left;
    width: 100%;
    transition: 0.3s color, 0.3s text-shadow;
    font-weight: $font-bold;
    color: $palette-white;
    @include mxGetFontSize(18);

    @include mxMediaHover() {
      &:hover {
        color: $palette-sky-blue;
        text-shadow: 0px 0px 16px rgba($palette-sky-blue, 0.64), 0px 0px 16px rgba($palette-sky-blue, 0.64);
      }
    }

    @include mxMediaQuerySm {
      padding: 16px 4.6vw;
    }
  }
}

.HeaderOverlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: $z-index-header-2;
  background-color: rgba($palette-blue-charcoal, 0.48);
  backdrop-filter: blur(8px);
}

.HeaderOverlay--active {
  display: block;
}
</style>
