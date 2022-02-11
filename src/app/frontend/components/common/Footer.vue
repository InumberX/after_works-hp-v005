<template>
  <footer class="l-footer">
    <div class="footer-fixed-box">
      <div class="footer-top-btn-box">
        <a
          href="#"
          title="ページトップに戻る"
          aria-label="ページトップに戻る"
          class="footer-top-btn"
          @click.prevent="utils.actSmoothScroll('#')"
        ></a>
      </div>
    </div>
    <div class="footer-contents-wrap">
      <div class="l-inner">
        <div class="footer-contents-box">
          <div class="footer-menu-box">
            <ul class="footer-menu-items">
              <li
                v-for="menuInfo in menuInfos"
                :key="menuInfo.text"
                class="footer-menu-item"
              >
                <NuxtLink :to="menuInfo.url" class="footer-menu-link">
                  {{ menuInfo.text }}
                </NuxtLink>
              </li>
            </ul>
          </div>
          <div class="footer-sns-box">
            <ul class="footer-sns-items">
              <li
                v-for="snsInfo in snsInfos"
                :key="snsInfo.title"
                class="footer-sns-item"
              >
                <a
                  :href="snsInfo.url"
                  :title="snsInfo.title"
                  :aria-label="snsInfo.title"
                  target="_blank"
                  rel="noopener"
                  class="footer-sns-link"
                >
                  <CommonIcon :class-name="snsInfo.iconClassName" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-copy-wrap">
      <div class="l-inner">
        <div class="footer-copy-box">
          <p class="footer-copy">
            <small class="footer-copy-text" lang="en" translate="no">
              Copyright &copy; {{ currentYear }} N/NE, All rights reserved.
            </small>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { $const } = useNuxtApp();
const config = useRuntimeConfig();
const utils = useUtils();

// メニュー情報
const menuInfos: {
  text: string;
  url: string;
}[] = [
  {
    text: $const.pageInfos.top.menuText,
    url: config.baseDir + $const.pageInfos.top.url,
  },
  {
    text: $const.pageInfos.blogs.menuText,
    url: config.baseDir + $const.pageInfos.blogs.url,
  },
  {
    text: $const.pageInfos.about.menuText,
    url: config.baseDir + $const.pageInfos.about.url,
  },
  {
    text: $const.pageInfos.works.menuText,
    url: config.baseDir + $const.pageInfos.works.url,
  },
  {
    text: $const.pageInfos.contact.menuText,
    url: config.baseDir + $const.pageInfos.contact.url,
  },
];

// SNS情報
interface snsInfos {
  [key: string]: {
    url: string;
    iconClassName: string;
    title: string;
  };
}
const snsInfos = <snsInfos>$const.snsInfos;

// 現在年
const currentYear: number = new Date().getFullYear();
</script>

<style lang="scss" scoped>
@use '~/assets/_scss/_global/index' as g;

// 変数
$color-l_footer-background: g.$palette-stratos;

$color-footer_menu_link-background: g.$palette-marigold_yellow;
$color-footer_menu_link-text: g.$palette-marigold_yellow;

$color-footer_copy-text: g.$palette-white;

$color-footer_top_btn-background: g.$palette-resolution_blue;
$color-footer_top_btn-background_hover: g.$palette-marigold_yellow;
$color-footer_top_btn-border: g.$palette-marigold_yellow;
$color-footer_top_btn-border_hover: g.$palette-resolution_blue;

.l-footer {
  background-color: $color-l_footer-background;
}
.footer-contents-wrap {
  padding-top: 28px;
}
.footer-menu-items {
  display: flex;
  flex-wrap: wrap;
}
.footer-menu-item {
  width: 50%;
}
.footer-menu-link:not(:root) {
  display: block;
  position: relative;
  font-size: 1.6rem;
  font-weight: 700;
  padding: 12px 16px;
  color: $color-footer_menu_link-text;
  &:hover {
    opacity: g.$opacity-main;
  }
  &:after {
    content: '';
    display: block;
    width: 8px;
    height: 2px;
    background-color: $color-footer_menu_link-background;
    position: absolute;
    top: 50%;
    margin-top: -1px;
    left: 0;
  }
}
.footer-sns-box {
  margin-top: 40px;
}
.footer-sns-items {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: -20px 0;
}
.footer-sns-item {
  margin: 20px;
}
.footer-sns-link:not(:root) {
  display: flex;
  &:hover {
    opacity: g.$opacity-main;
  }
}
.footer-copy-box {
  margin-top: 64px;
  padding: 24px 0;
}
.footer-copy {
  text-align: center;
  font-size: 1rem;
  color: $color-footer_copy-text;
}
.footer-fixed-box {
  position: fixed;
  z-index: g.$z_index-footer_1;
  bottom: 16px;
  right: 4vw;
}
.footer-top-btn:not(:root) {
  position: relative;
  display: block;
  width: 48px;
  height: 48px;
  border-radius: 48px;
  background-color: $color-footer_top_btn-background;
  &:after {
    @include g.mxArrowLine(
      16px,
      50%,
      50%,
      '',
      '',
      -5px,
      -8px,
      '',
      '',
      4px,
      $color-footer_top_btn-border,
      135deg
    ) {
      transition: 0.3s border-color;
    }
  }
  &:hover {
    background-color: $color-footer_top_btn-background_hover;
    &:after {
      border-color: $color-footer_top_btn-border_hover;
    }
  }
}
@include g.mxMediaQuery(g.$bp-sm) {
  .footer-contents-wrap {
    padding-top: 68px;
  }
  .footer-menu-items {
    justify-content: center;
    margin: -12px 0;
    > .footer-menu-item {
      &:last-of-type {
        margin-right: 0;
      }
    }
  }
  .footer-menu-item {
    width: auto;
    margin: 12px 40px 12px 0;
  }
  .footer-menu-link:not(:root) {
    padding: 0 0 0 16px;
  }
  .footer-sns-box {
    margin-top: 80px;
  }
  .footer-copy {
    font-size: 1.2rem;
  }
  .footer-fixed-box {
    right: 4.6vw;
  }
}
@include g.mxMediaQuery(g.$bp-md) {
  .footer-fixed-box {
    right: 32px;
  }
}
</style>
