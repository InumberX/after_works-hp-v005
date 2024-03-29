<template>
  <section class="l-sidebar-section">
    <PartsSidebarTitle title="最近の記事" />
    <div class="sidebar-article-list-box">
      <ul class="sidebar-article-list-items">
        <li
          v-for="blogInfo in blogInfos"
          :key="blogInfo.id"
          class="sidebar-article-list-item"
        >
          <NuxtLink
            :to="`${config.baseDir}${$const.pageInfos.blogs.url}${blogInfo.id}/`"
            class="sidebar-article-list-link"
          >
            <figure class="sidebar-article-list-img-box">
              <img
                v-if="blogInfo.attributes.img.data"
                :src="blogInfo.attributes.img.data.attributes.url"
                alt=""
                class="sidebar-article-list-img"
              />
              <img
                v-else
                :src="`${config.baseDir}${$const.url.imgEmpty}`"
                alt=""
                class="sidebar-article-list-img"
              />
            </figure>
            <div class="sidebar-article-list-contents">
              <div
                v-if="blogInfo.attributes.date"
                class="sidebar-article-list-date-box"
              >
                <time
                  class="sidebar-article-list-date"
                  :datetime="blogInfo.attributes.date"
                >
                  {{ utils.getDate(blogInfo.attributes.date) }}
                </time>
              </div>
              <div class="sidebar-article-list-title-box">
                <p class="sidebar-article-list-title">
                  {{ blogInfo.attributes.title }}
                </p>
              </div>
            </div>
          </NuxtLink>
        </li>
      </ul>
      <div
        v-if="listPageUrl && listPageText"
        class="sidebar-article-bottom-list-page-link-box"
      >
        <NuxtLink
          :to="listPageUrl"
          class="sidebar-article-bottom-list-page-link"
        >
          <span class="sidebar-article-bottom-list-page-link-text">
            {{ listPageText }}
          </span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useClientHandle, gql } from '@urql/vue';
const urql = useClientHandle();
const { $const } = useNuxtApp();
const config = useRuntimeConfig();
const utils = useUtils();

type Props = {
  listPageUrl?: string;
  listPageText?: string;
};

const { listPageUrl, listPageText } = defineProps<Props>();

const blogsResult = await urql.useQuery({
  query: gql`
    query getBlogs {
      blogs(pagination: { limit: 5 }, sort: ["createdDate:desc", "id:desc"]) {
        data {
          id
          attributes {
            title
            date: createdDate
            img {
              data {
                id
                attributes {
                  url
                }
              }
            }
          }
        }
      }
    }
  `,
});

const blogInfos = ref<articleListInfos[]>([]);

if (
  utils.isNotEmpty(blogsResult.data.value.blogs) &&
  utils.isNotEmpty(blogsResult.data.value.blogs.data)
) {
  blogInfos.value = blogsResult.data.value.blogs.data;
}
</script>

<style lang="scss" scoped>
@use '~/assets/_scss/_global/index' as g;

// 変数
$color-sidebar_article_list_item-border: g.$palette-gallery;

$color-sidebar_article_list_link-background: g.$palette-white;
$color-sidebar_article_list_link-text: g.$palette-mine_shaft;
$color-sidebar_article_list_link-text_hover: g.$palette-resolution_blue;

$color-sidebar_article_list_date_box-text: g.$palette-boulder;

$color-sidebar_article_bottom_list_page_link-border: g.$palette-resolution_blue;
$color-sidebar_article_bottom_list_page_link-border_hover: g.$palette-east_bay;

.sidebar-article-list-box {
  margin-top: 24px;
}
.sidebar-article-list-items {
  > .sidebar-article-list-item {
    &:last-of-type {
      border-bottom: none;
    }
  }
}
.sidebar-article-list-item {
  border-bottom: 1px solid $color-sidebar_article_list_item-border;
}
.sidebar-article-list-link:not(:root) {
  display: flex;
  font-size: 1.4rem;
  color: $color-sidebar_article_list_link-text;
  background-color: $color-sidebar_article_list_link-background;
  padding: 16px 0;
  @media (hover: hover) {
    &:hover {
      color: $color-sidebar_article_list_link-text_hover;
      .sidebar-article-list-img {
        transform: scale(1.1);
      }
    }
  }
}
.sidebar-article-list-img-box {
  position: relative;
  width: 96px;
  height: 54px;
  overflow: hidden;
}
.sidebar-article-list-img {
  position: absolute;
  object-fit: cover;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: 0.3s transform;
}
.sidebar-article-list-contents {
  width: calc(100% - 96px);
  padding-left: 16px;
}
.sidebar-article-list-date-box {
  font-size: 1rem;
  color: $color-sidebar_article_list_date_box-text;
}
.sidebar-article-list-title {
  font-weight: 700;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  font-size: inherit;
}
.sidebar-article-bottom-list-page-link-box {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}
.sidebar-article-bottom-list-page-link:not(:root) {
  display: block;
  position: relative;
  font-size: 1.4rem;
  font-weight: 700;
  padding-right: 24px;
  &:after {
    @include g.mxArrowLine(
      12px,
      50%,
      4px,
      '',
      '',
      -6px,
      '',
      '',
      '',
      4px,
      $color-sidebar_article_bottom_list_page_link-border,
      225deg
    ) {
      transition: 0.3s border-color;
    }
  }
  @media (hover: hover) {
    &:hover {
      &:after {
        border-color: $color-sidebar_article_bottom_list_page_link-border_hover;
      }
    }
  }
}
</style>
