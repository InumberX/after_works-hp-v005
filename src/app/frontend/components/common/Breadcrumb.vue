<template>
  <div class="l-breadcrumb">
    <div class="l-inner">
      <div class="breadcrumb-box">
        <ol
          class="breadcrumb-items"
          itemscope
          itemtype="http://schema.org/BreadcrumbList"
        >
          <li
            class="breadcrumb-item"
            itemprop="itemListElement"
            itemscope
            itemtype="http://schema.org/ListItem"
          >
            <NuxtLink
              :to="`${config.baseDir}${$const.pageInfos.top.url}`"
              itemprop="item"
              class="breadcrumb-link"
            >
              <span class="breadcrumb-link-text" itemprop="name">
                {{ $const.pageInfos.top.menuText }}
              </span>
            </NuxtLink>
            <meta itemprop="position" content="1" />
          </li>
          <li
            v-for="(breadcrumbInfo, i) in breadcrumbInfos"
            :key="breadcrumbInfo.text"
            class="breadcrumb-item"
            itemprop="itemListElement"
            itemscope
            itemtype="http://schema.org/ListItem"
          >
            <NuxtLink
              v-if="breadcrumbInfo.url"
              :to="breadcrumbInfo.url"
              itemprop="item"
              class="breadcrumb-link"
            >
              <span class="breadcrumb-link-text" itemprop="name">
                {{ breadcrumbInfo.text }}
              </span>
            </NuxtLink>
            <span v-else class="breadcrumb-text" itemprop="name">
              {{ breadcrumbInfo.text }}
            </span>
            <meta itemprop="position" :content="String(i + 2)" />
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { $const } = useNuxtApp();
const config = useRuntimeConfig();
type Props = {
  breadcrumbInfos: {
    url?: string;
    text: string;
  }[];
};
const { breadcrumbInfos } = defineProps<Props>();
</script>

<style lang="scss" scoped>
@use '~/assets/_scss/_global/index' as g;

// 変数
$color-breadcrumb_item-border: g.$palette-resolution_blue;

$color-breadcrumb_link-text: g.$palette-boulder;
$color-breadcrumb_link-text_hover: g.$palette-resolution_blue;

.l-breadcrumb {
  margin-top: 8px;
  overflow-x: auto;
}
.breadcrumb-items {
  display: flex;
  margin: -2px 0;
  > .breadcrumb-item {
    &:last-of-type {
      padding-right: 4vw;
      &:after {
        content: none;
      }
    }
  }
}
.breadcrumb-item {
  position: relative;
  white-space: nowrap;
  padding-right: 16px;
  margin: 2px 0;
  &:after {
    @include g.mxArrowLine(
      4px,
      50%,
      6px,
      '',
      '',
      -2px,
      '',
      '',
      '',
      1px,
      $color-breadcrumb_item-border,
      225deg
    ) {
    }
  }
}
.breadcrumb-link:not(:root) {
  display: block;
  font-size: 1rem;
  color: $color-breadcrumb_link-text;
  @media (hover: hover) {
    &:hover {
      color: $color-breadcrumb_link-text_hover;
    }
  }
}
.breadcrumb-text {
  display: block;
  font-size: 1rem;
}
@include g.mxMediaQuery(g.$bp-sm) {
  .l-breadcrumb {
    overflow: hidden;
  }
  .breadcrumb-items {
    flex-wrap: wrap;
    > .breadcrumb-item {
      &:last-of-type {
        padding-right: 0;
      }
    }
  }
  .breadcrumb-item {
    white-space: normal;
  }
}
</style>
