<template>
  <div class="paging-box">
    <ul class="paging-items">
      <li v-if="pagingInfo.currentPage !== 1" class="paging-item is-prev">
        <NuxtLink
          :to="{
            path: pagingInfo.pageUrl,
            query: {
              p: pagingInfo.currentPage - 1,
            },
          }"
          class="paging-link"
        ></NuxtLink>
      </li>
      <template v-if="isNormalMode">
        <template v-if="pagingInfo.pageCount <= 5">
          <li v-for="i in pagingInfo.pageCount" :key="i" class="paging-item">
            <span v-if="pagingInfo.currentPage === i" class="paging-current">
              {{ i }}
            </span>
            <NuxtLink
              v-else
              :to="{
                path: pagingInfo.pageUrl,
                query: {
                  p: i,
                },
              }"
              class="paging-link"
            >
              {{ i }}
            </NuxtLink>
          </li>
        </template>
        <template v-else>
          <template v-for="i in pagingInfo.pageCount" :key="i">
            <li
              v-if="
                i === pagingInfo.pageCount &&
                pagingInfo.currentPage <= pagingInfo.pageCount - 3
              "
              class="paging-item is-separator"
            >
              <span class="paging-separator"></span>
            </li>
            <li
              v-if="
                i === 1 ||
                i === pagingInfo.pageCount ||
                (i >= pagingInfo.currentPage - 1 &&
                  i <= pagingInfo.currentPage + 1)
              "
              class="paging-item"
              :class="[
                {
                  'is-current': i === pagingInfo.currentPage,
                  'is-first': i === 1,
                  'is-last': i === pagingInfo.pageCount,
                },
              ]"
            >
              <span v-if="pagingInfo.currentPage === i" class="paging-current">
                {{ i }}
              </span>
              <NuxtLink
                v-else
                :to="{
                  path: pagingInfo.pageUrl,
                  query: {
                    p: i,
                  },
                }"
                class="paging-link"
              >
                {{ i }}
              </NuxtLink>
            </li>
            <li
              v-if="i === 1 && pagingInfo.currentPage >= 4"
              class="paging-item is-separator"
            >
              <span class="paging-separator"></span>
            </li>
          </template>
        </template>
      </template>
      <template v-else>
        <template v-if="pagingInfo.pageCount <= 3">
          <li v-for="i in pagingInfo.pageCount" :key="i" class="paging-item">
            <span v-if="pagingInfo.currentPage === i" class="paging-current">
              {{ i }}
            </span>
            <NuxtLink
              v-else
              :to="{
                path: pagingInfo.pageUrl,
                query: {
                  p: i,
                },
              }"
              class="paging-link"
            >
              {{ i }}
            </NuxtLink>
          </li>
        </template>
        <template v-else>
          <template v-for="i in pagingInfo.pageCount" :key="i">
            <li
              v-if="
                i === pagingInfo.pageCount &&
                pagingInfo.currentPage <= pagingInfo.pageCount - 2
              "
              class="paging-item is-separator"
            >
              <span class="paging-separator"></span>
            </li>
            <li
              v-if="
                i === 1 ||
                i === pagingInfo.pageCount ||
                (i >= pagingInfo.currentPage && i <= pagingInfo.currentPage)
              "
              class="paging-item"
              :class="[
                {
                  'is-current': i === pagingInfo.currentPage,
                  'is-first': i === 1,
                  'is-last': i === pagingInfo.pageCount,
                },
              ]"
            >
              <span v-if="pagingInfo.currentPage === i" class="paging-current">
                {{ i }}
              </span>
              <NuxtLink
                v-else
                :to="{
                  path: pagingInfo.pageUrl,
                  query: {
                    p: i,
                  },
                }"
                class="paging-link"
              >
                {{ i }}
              </NuxtLink>
            </li>
            <li
              v-if="i === 1 && pagingInfo.currentPage >= 3"
              class="paging-item is-separator"
            >
              <span class="paging-separator"></span>
            </li>
          </template>
        </template>
      </template>
      <li
        v-if="pagingInfo.currentPage !== pagingInfo.pageCount"
        class="paging-item is-next"
      >
        <NuxtLink
          :to="{
            path: pagingInfo.pageUrl,
            query: {
              p: pagingInfo.currentPage + 1,
            },
          }"
          class="paging-link"
        ></NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
type Props = {
  pagingInfo: {
    pageUrl: string;
    currentPage: number;
    pageSize: number;
    pageCount: number;
  };
};
const { pagingInfo } = defineProps<Props>();

const { breakpoints } = useBreakpoints();
const isNormalMode = computed(() => {
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
</script>

<style lang="scss" scoped>
@use '~/assets/_scss/_global/index' as g;

// 変数
$color-paging_link-background: g.$palette-seashell;
$color-paging_link-background_hover: g.$palette-resolution_blue;
$color-paging_link-text: g.$palette-resolution_blue;
$color-paging_link-text_hover: g.$palette-marigold_yellow;

$color-paging_link_prev_next-background: g.$palette-resolution_blue;
$color-paging_link_prev_next-background_hover: g.$palette-marigold_yellow;
$color-paging_link_prev_next-border: g.$palette-marigold_yellow;
$color-paging_link_prev_next-border_hover: g.$palette-resolution_blue;

$color-paging_current-text: g.$palette-boulder;

.paging-box {
  margin-top: 24px;
}
.paging-items {
  display: flex;
  align-items: center;
  justify-content: center;
  > .paging-item {
    &:last-of-type {
      margin-right: 0;
    }
  }
}
.paging-item {
  margin-right: 8px;
  &.is-prev,
  &.is-next {
    .paging-link:not(:root) {
      background-color: $color-paging_link_prev_next-background;
      @media (hover: hover) {
        &:hover {
          background-color: $color-paging_link_prev_next-background_hover;
          &:after {
            border-color: $color-paging_link_prev_next-border_hover;
          }
        }
      }
    }
  }
  &.is-prev {
    .paging-link:not(:root) {
      &:after {
        @include g.mxArrowLine(
          12px,
          50%,
          50%,
          '',
          '',
          -6px,
          -8px,
          '',
          '',
          4px,
          $color-paging_link_prev_next-border,
          45deg
        ) {
          transition: 0.3s border-color;
        }
      }
    }
  }
  &.is-next {
    .paging-link:not(:root) {
      &:after {
        @include g.mxArrowLine(
          12px,
          50%,
          50%,
          '',
          '',
          -6px,
          -4px,
          '',
          '',
          4px,
          $color-paging_link_prev_next-border,
          225deg
        ) {
          transition: 0.3s border-color;
        }
      }
    }
  }
}
.paging-link:not(:root) {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: 700;
  white-space: nowrap;
  text-align: center;
  width: 36px;
  height: 36px;
  border-radius: 48px;
  background-color: $color-paging_link-background;
  color: $color-paging_link-text;
  @media (hover: hover) {
    &:hover {
      background-color: $color-paging_link-background_hover;
      color: $color-paging_link-text_hover;
    }
  }
}
.paging-current {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: 700;
  white-space: nowrap;
  text-align: center;
  width: 36px;
}
.paging-separator {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: 700;
  white-space: nowrap;
  text-align: center;
  color: $color-paging_current-text;
  &:before {
    content: '…';
  }
}
@include g.mxMediaQuery(g.$bp-sm) {
  .paging-box {
    margin-top: 40px;
  }
  .paging-link:not(:root) {
    width: 48px;
    height: 48px;
  }
  .paging-current {
    width: 48px;
  }
}
</style>
