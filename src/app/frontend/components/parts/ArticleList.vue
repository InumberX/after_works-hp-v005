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
              :to="`${articleUrl}${articleListInfo.id}`"
              class="article-list-link"
            >
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
                v-if="articleListInfo.attributes.date"
                class="article-list-date-box"
              >
                <time
                  class="article-list-date"
                  :datetime="articleListInfo.attributes.date"
                >
                  {{ utils.getDate(articleListInfo.attributes.date) }}
                </time>
              </div>
              <div class="article-list-title-box">
                <p class="article-list-title">
                  {{ articleListInfo.attributes.title }}
                </p>
              </div>
              <div
                v-if="
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
            </NuxtLink>
          </li>
        </ul>
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
  articleListInfos: {
    id: string;
    attributes: {
      title: string;
      date: string;
      img: {
        data?: {
          id: string;
          attributes: {
            url: string;
          };
        };
      };
      tags: {
        data?: {
          id: string;
          attributes: {
            name: string;
          };
        }[];
      };
    };
  }[];
  articleUrl: string;
  className?: string;
  listPageUrl?: string;
  listPageText?: string;
};
const { articleListInfos, articleUrl, className, listPageUrl, listPageText } =
  defineProps<Props>();
</script>

<style lang="scss" scoped>
@use '~/assets/_scss/_global/index' as g;

// 変数
$color-article_list_link-background: g.$palette-white;
$color-article_list_link-text: g.$palette-mine_shaft;
$color-article_list_link-text_hover: g.$palette-resolution_blue;

$color-article_list_date_box-text: g.$palette-boulder;

$color-article_list_tag-background: g.$palette-seashell;
$color-article_list_tag-text: g.$palette-boulder;

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
  display: block;
  font-size: 1.6rem;
  color: $color-article_list_link-text;
  background-color: $color-article_list_link-background;
  &:hover {
    color: $color-article_list_link-text_hover;
    .article-list-img {
      transform: scale(1.1);
    }
  }
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
  .article-list-items {
    display: flex;
    flex-wrap: wrap;
    > .article-list-item {
      @include g.mxListWidth(2, 24px) {
      }
    }
  }
  .article-list-link:not(:root) {
    display: flex;
    flex-direction: column;
    height: 100%;
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
  .article-list-items {
    > .article-list-item {
      @include g.mxListWidth(3, 24px) {
      }
      &:nth-of-type(2n) {
        margin-right: 24px;
      }
    }
  }
}
</style>
