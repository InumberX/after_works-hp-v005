<template>
  <div class="l-article-list" :class="[className]">
    <div class="l-inner">
      <div class="article-list-box">
        <ul class="article-list-items">
          <li
            v-for="articleListInfo in articleListInfos"
            :key="articleListInfo.id"
            class="article-list-item"
          >
            <NuxtLink
              :to="`${articleUrl}${articleListInfo.id}/`"
              class="article-list-link"
            >
              <div class="article-list-link-contents">
                <figure class="article-list-img-box">
                  <img
                    v-if="articleListInfo.attributes.img.data"
                    :src="articleListInfo.attributes.img.data.attributes.url"
                    alt=""
                    class="article-list-img"
                  />
                  <img
                    v-else
                    :src="`${config.baseDir}${$const.url.imgEmpty}`"
                    alt=""
                    class="article-list-img"
                  />
                </figure>
                <div
                  v-if="
                    articleListInfo.attributes.date ||
                    articleListInfo.attributes.from ||
                    articleListInfo.attributes.to
                  "
                  class="article-list-date-box"
                >
                  <template
                    v-if="
                      articleListInfo.attributes.from ||
                      articleListInfo.attributes.to
                    "
                  >
                    <time
                      v-if="articleListInfo.attributes.from"
                      class="article-list-date"
                      :datetime="articleListInfo.attributes.from"
                    >
                      {{ utils.getDate(articleListInfo.attributes.from) }}
                    </time>
                    <template v-if="articleListInfo.attributes.to">
                      〜
                      <time
                        class="article-list-date"
                        :datetime="articleListInfo.attributes.to"
                      >
                        {{ utils.getDate(articleListInfo.attributes.to) }}
                      </time>
                    </template>
                  </template>
                  <template v-else>
                    <time
                      class="article-list-date"
                      :datetime="articleListInfo.attributes.date"
                    >
                      {{ utils.getDate(articleListInfo.attributes.date) }}
                    </time>
                  </template>
                </div>
                <div class="article-list-title-box">
                  <p class="article-list-title">
                    {{ articleListInfo.attributes.title }}
                  </p>
                </div>
                <div
                  v-if="
                    articleListInfo.attributes.tags &&
                    articleListInfo.attributes.tags.data &&
                    articleListInfo.attributes.tags.data.length > 0
                  "
                  class="article-list-tag-box"
                >
                  <ul class="article-list-tag-items">
                    <li
                      v-for="tag in articleListInfo.attributes.tags.data"
                      :key="tag.id"
                      class="article-list-tag-item"
                    >
                      <span class="article-list-tag">
                        {{ tag.attributes.name }}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </NuxtLink>
          </li>
        </ul>
        <PartsPaging
          v-if="pagingInfo && pagingInfo.pageCount >= 2"
          :paging-info="pagingInfo"
        />
        <div
          v-if="listPageUrl && listPageText"
          class="article-list-page-link-box"
        >
          <NuxtLink
            :to="listPageUrl"
            class="primary-btn article-list-page-link"
          >
            <span class="primary-btn-text">
              {{ listPageText }}
            </span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { $const } = useNuxtApp();
const config = useRuntimeConfig();
const utils = useUtils();

type Props = {
  articleListInfos: articleListInfos[];
  articleUrl: string;
  className?: string;
  listPageUrl?: string;
  listPageText?: string;
  pagingInfo?: {
    pageUrl: string;
    currentPage: number;
    pageSize: number;
    pageCount: number;
  };
};
const {
  articleListInfos,
  articleUrl,
  className,
  listPageUrl,
  listPageText,
  pagingInfo,
} = defineProps<Props>();
</script>

<style lang="scss" scoped>
@use '~/assets/_scss/_global/index' as g;

// 変数
$color-article_list_link-background: g.$palette-white;
$color-article_list_link-text: g.$palette-mine_shaft;
$color-article_list_link-text_hover: g.$palette-resolution_blue;
$color-article_list_link-border: g.$palette-gallery;
$color-article_list_link-border_hover: g.$palette-east_bay;

$color-article_list_date_box-text: g.$palette-boulder;

$color-article_list_tag-background: g.$palette-seashell;
$color-article_list_tag-text: g.$palette-boulder;

.l-article-list {
  &.is-ground-top {
    .article-list-box {
      margin-top: 0;
    }
  }
  &.is-horizontality {
    .article-list-items {
      display: flex;
      flex-wrap: nowrap;
      width: calc(100% + (4vw * 2) + 4vw);
      overflow-x: auto;
      margin-left: -4vw;
      padding: 0 4vw;
    }
    .article-list-item:not(:root) {
      flex-shrink: 0;
      width: 80%;
      margin: 0 24px 0 0;
    }
  }
}
.article-list-box {
  margin-top: 24px;
}
.article-list-items {
  > .article-list-item {
    &:first-of-type {
      margin-top: 0;
    }
  }
}
.article-list-item {
  margin-top: 24px;
}
.article-list-link:not(:root) {
  position: relative;
  display: block;
  font-size: 1.6rem;
  color: $color-article_list_link-text;
  background-color: $color-article_list_link-background;
  overflow: hidden;
  height: 100%;
  @media (hover: hover) {
    &:hover {
      color: $color-article_list_link-text_hover;
      .article-list-img {
        transform: scale(1.1);
      }
    }
  }
}
.article-list-link-contents {
  display: block;
  background-color: $color-article_list_link-background;
  overflow: hidden;
  height: 100%;
}
.article-list-img-box {
  position: relative;
  padding-top: 56.25%;
  overflow: hidden;
}
.article-list-img {
  position: absolute;
  object-fit: cover;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: 0.3s transform;
}
.article-list-date-box {
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  color: $color-article_list_date_box-text;
  margin-top: 16px;
  + .article-list-title-box {
    margin-top: 4px;
  }
}
.article-list-title-box {
  margin-top: 16px;
}
.article-list-title {
  font-weight: 700;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  font-size: inherit;
}
.article-list-tag-box {
  margin-top: 16px;
}
.article-list-tag-items {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  margin: -4px -8px -4px 0;
}
.article-list-tag-item {
  margin: 4px 8px 4px 0;
}
.article-list-tag {
  display: block;
  font-size: 1rem;
  color: $color-article_list_tag-text;
  background-color: $color-article_list_tag-background;
  border-radius: 4px;
  padding: 1px 8px;
}
.article-list-page-link-box {
  display: flex;
  justify-content: center;
  margin-top: 24px;
}
@include g.mxMediaQuery(g.$bp-sm) {
  .l-article-list {
    &.is-horizontality {
      .article-list-items {
        width: calc(100% + (4.6vw * 2) + 4.6vw);
        margin-left: -4.6vw;
        padding: 0 4.6vw;
      }
      .article-list-item:not(:root) {
        width: 50%;
      }
    }
  }
  .article-list-items {
    display: flex;
    flex-wrap: wrap;
    > .article-list-item {
      @include g.mxListWidth(2, 24px) {
      }
    }
  }
  .article-list-link-contents {
    display: flex;
    flex-direction: column;
  }
  .article-list-tag-box {
    margin-top: auto;
  }
  .article-list-tag-items {
    margin-top: 12px;
  }
  .article-list-page-link-box {
    margin-top: 40px;
  }
}
@include g.mxMediaQuery(g.$bp-md) {
  .l-article-list {
    &.is-horizontality {
      .article-list-items {
        width: 100%;
        margin-left: 0;
        padding: 0;
      }
      .article-list-item:not(:root) {
        width: calc(100% / 3 - 16px);
      }
    }
    &:not(.is-parallel-main) {
      .article-list-items {
        > .article-list-item {
          &:nth-of-type(2n) {
            margin-right: 24px;
          }
          @include g.mxListWidth(3, 24px) {
          }
        }
      }
    }
  }
}
@include g.mxMediaQuery(g.$bp-lg) {
  .l-article-list {
    &.is-parallel-main {
      .article-list-items {
        > .article-list-item {
          &:nth-of-type(2n) {
            margin-right: 24px;
          }
          @include g.mxListWidth(3, 24px) {
          }
        }
      }
    }
  }
}
</style>
