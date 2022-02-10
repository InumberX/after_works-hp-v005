<template>
  <header class="l-header">
    <div class="l-inner header-inner">
      <div class="header-box">
        <div class="header-logo-box">
          <h1 class="header-logo">
            <NuxtLink to="/" class="header-logo-link">
              <img
                :src="`${config.baseDir}${$const.url.imgLogo}?${config.cashBuster}`"
                :alt="$const.meta.title"
                class="header-logo-img"
                width="160"
                height="26"
              />
            </NuxtLink>
          </h1>
        </div>
        <!-- /.header-logo-box -->
        <div class="header-menu-box">
          <div class="header-menu-btn-box">
            <button
              type="button"
              class="header-menu-btn"
              @click="toggleMenu"
              :class="[flgShowMenu ? $const.className.active : '']"
            >
              <span class="header-menu-btn-contents">
                <span class="header-hamburger-box">
                  <span class="header-hamburger"></span>
                  <span class="header-hamburger"></span>
                  <span class="header-hamburger"></span>
                </span>
                <span class="header-menu-btn-text">{{ menuBtnText }}</span>
              </span>
            </button>
          </div>
          <!-- /.header-menu-btn-box -->
          <transition name="animation-header-menu">
            <div
              v-if="flgShowMenu || isShowMenu"
              class="header-menu-contents-box"
              :class="[flgShowMenu ? $const.className.active : '']"
            >
              <div class="header-menu-contents">
                <nav class="header-menu-link-box">
                  <ul class="header-menu-link-items">
                    <li
                      v-for="menuInfo in menuInfos"
                      :key="menuInfo.text"
                      class="header-menu-link-item"
                    >
                      <NuxtLink
                        :to="menuInfo.url"
                        class="header-menu-link"
                        @click="hideMenu"
                      >
                        <span class="header-menu-link-contents">
                          <CommonIcon :class-name="menuInfo.iconClassName" />
                          <span class="header-menu-link-text">
                            {{ menuInfo.text }}
                          </span>
                        </span>
                      </NuxtLink>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </transition>
          <!-- /.header-menu-contents-box -->
          <transition name="animation-fade" appear>
            <div
              v-if="flgShowMenu"
              class="header-overlay-bg"
              :class="[flgShowMenu ? $const.className.active : '']"
              @click="hideMenu"
            ></div>
          </transition>
          <!-- /.header-overlay-bg -->
        </div>
        <!-- /.header-menu-box -->
      </div>
      <!-- /.header-box -->
    </div>
    <!-- /.l-inner -->
  </header>
</template>

<script setup lang="ts">
import { useUtils } from '~/composables/useUtils';
import { useBreakpoints } from '~/composables/useBreakpoints';

const { $const } = useNuxtApp();
const config = useRuntimeConfig();
const utils = useUtils();
const { breakpoints } = useBreakpoints();

// メニュー表示フラグ
const flgShowMenu = ref<boolean>(false);

const isShowMenu = computed(() => {
  let result: boolean = false;

  // 特定の画面幅以上の場合
  if (
    breakpoints.value.flg.sm ||
    breakpoints.value.flg.md ||
    breakpoints.value.flg.lg ||
    breakpoints.value.flg.xl ||
    breakpoints.value.flg.xxl
  ) {
    result = true;
  }

  return result;
});

watch(isShowMenu, (newValues: boolean, oldValues: boolean) => {
  hideMenu();
});

// メニュー情報
const menuInfos: {
  text: string;
  url: string;
  iconClassName: string;
}[] = [
  {
    text: $const.pageInfos.top.menuText,
    url: config.baseDir + $const.pageInfos.top.url,
    iconClassName: $const.pageInfos.top.iconClassName,
  },
  {
    text: $const.pageInfos.blogs.menuText,
    url: config.baseDir + $const.pageInfos.blogs.url,
    iconClassName: $const.pageInfos.blogs.iconClassName,
  },
  {
    text: $const.pageInfos.about.menuText,
    url: config.baseDir + $const.pageInfos.about.url,
    iconClassName: $const.pageInfos.about.iconClassName,
  },
  {
    text: $const.pageInfos.works.menuText,
    url: config.baseDir + $const.pageInfos.works.url,
    iconClassName: $const.pageInfos.works.iconClassName,
  },
  {
    text: $const.pageInfos.contact.menuText,
    url: config.baseDir + $const.pageInfos.contact.url,
    iconClassName: $const.pageInfos.contact.iconClassName,
  },
];

// メニューボタンのテキスト
const menuBtnText = computed(() => {
  let result: string = 'メニュー';

  // メニューを表示している場合
  if (flgShowMenu.value) {
    result = '閉じる';
  }

  return result;
});

// メニューの表示非表示を切り替える処理
const toggleMenu = () => {
  // メニューが非表示の場合
  if (!flgShowMenu.value) {
    // メニューを表示する
    showMenu();
  }
  // メニューを表示している場合
  else {
    // メニューを非表示にする
    hideMenu();
  }
};

// メニューを表示する処理
const showMenu = () => {
  flgShowMenu.value = true;
  utils.fixParentScreen();
};

// メニューを非表示にする処理
const hideMenu = () => {
  flgShowMenu.value = false;
  utils.unfixParentScreen();
};
</script>

<style lang="scss" scoped>
@use '~/assets/_scss/_global/index' as g;

// 変数
$color-l_header-background: g.$palette-white;
$color-l_header-border: g.$palette-gallery;

$color-header_menu_btn-background: g.$palette-resolution_blue;
$color-header_menu_btn-text: g.$palette-marigold_yellow;

$color-header_hamburger-background: g.$palette-marigold_yellow;

$color-header_menu_contents-background: g.$palette-white;

$color-header_menu_link-text: g.$palette-mine_shaft;
$color-header_menu_link-text_hover: g.$palette-resolution_blue;

$color-header_overlay_bg-background: g.$palette-black;

.l-header {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: g.$z_index-header_1;
  background-color: $color-l_header-background;
}
.header-box {
  height: 64px;
  display: flex;
  justify-content: center;
}
.header-logo-box {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}
.header-logo-link:not(:root) {
  display: block;
  &:hover {
    opacity: g.$opacity-main;
  }
}
.header-logo-img {
  width: 160px;
  height: 26px;
}
.header-menu-btn-box {
  position: fixed;
  z-index: g.$z_index-header_3;
  top: 16px;
  right: 4vw;
}
.header-menu-btn:not(:root) {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 56px;
  border: none;
  padding: 4px 0 0;
  text-align: center;
  font-size: 1rem;
  background-color: $color-header_menu_btn-background;
  color: $color-header_menu_btn-text;
  text-align: center;
  overflow: hidden;
  &.is-active {
    .header-hamburger-box {
      .header-hamburger {
        &:nth-of-type(1) {
          top: 5px;
          transform: rotate(-45deg);
        }
        &:nth-of-type(2) {
          opacity: 0;
        }
        &:nth-of-type(3) {
          bottom: 7px;
          transform: rotate(45deg);
        }
      }
    }
  }
}
.header-hamburger-box {
  display: block;
  width: 24px;
  height: 14px;
  position: relative;
  margin: 0 auto;
  .header-hamburger {
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
.header-hamburger {
  display: block;
  width: 100%;
  height: 2px;
  background-color: $color-header_hamburger-background;
  position: absolute;
  right: 0;
  transition: 0.3s all;
}
.header-menu-btn-text {
  display: block;
  margin-top: 4px;
}
.header-menu-contents-box {
  display: none;
  position: fixed;
  top: 96px;
  right: 4vw;
  z-index: g.$z_index-header_4;
  &.is-active {
    display: block;
  }
}
.header-menu-contents {
  width: 280px;
  max-height: 70vh;
  overflow-y: auto;
  background-color: $color-header_menu_contents-background;
  border-radius: 16px;
}
.header-menu-link:not(:root) {
  display: block;
  padding: 16px;
  font-size: 1.4rem;
  font-weight: 700;
  color: $color-header_menu_link-text;
  &:hover {
    color: $color-header_menu_link-text_hover;
  }
  .icon {
    display: block;
    flex-shrink: 0;
    margin-right: 8px;
  }
}
.header-menu-link-contents {
  display: flex;
  align-items: center;
}
.header-overlay-bg {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba($color-header_overlay_bg-background, 0.6);
  z-index: g.$z_index-header_2;
  &.is-active {
    display: block;
  }
}
/* ヘッダーメニュー表示アニメーション */
.animation-header-menu {
  &-enter-active,
  &-leave-active {
    transition: 0.3s opacity, 0.3s transform;
  }
  &-enter-from,
  &-leave-to {
    opacity: 0 !important;
    transform: scale(0.6) !important;
  }
  &-enter-to,
  &-leave-from {
    opacity: 1 !important;
    transform: scale(1) !important;
  }
}
@include g.mxMediaQuery(g.$bp-sm) {
  .l-header {
    position: fixed;
    border-bottom: 1px solid $color-l_header-border;
  }
  .header-box {
    justify-content: space-between;
  }
  .header-menu-btn-box {
    display: none;
  }
  .header-menu-contents-box {
    display: block;
    position: static;
    height: 100%;
  }
  .header-menu-contents {
    width: auto;
    height: 100%;
    overflow: hidden;
    max-height: none;
    background-color: transparent;
    border-radius: 0;
  }
  .header-menu-link-box {
    height: 100%;
  }
  .header-menu-link-items {
    display: flex;
    height: 100%;
  }
  .header-menu-link:not(:root) {
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 8px 4px;
    min-width: 64px;
    height: 100%;
    .icon {
      margin: 0 auto;
    }
  }
  .header-menu-link-contents {
    display: block;
  }
  .header-menu-link-text {
    display: block;
  }
  /* ヘッダーメニュー表示アニメーション */
  .animation-header-menu {
    &-enter-active,
    &-leave-active {
      transition: 0s opacity, 0s transform;
    }
    &-enter-from,
    &-leave-to {
      opacity: 1 !important;
      transform: scale(1) !important;
    }
    &-enter-to,
    &-leave-from {
      opacity: 1 !important;
      transform: scale(1) !important;
    }
  }
}
@include g.mxMediaQuery(g.$bp-md) {
  .header-menu-link:not(:root) {
    padding: 8px;
    min-width: 88px;
  }
}
@include g.mxMediaQuery(g.$bp-lg) {
  .header-menu-link:not(:root) {
    min-width: 104px;
  }
}
</style>
