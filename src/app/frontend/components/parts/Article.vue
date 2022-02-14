<template>
  <article class="l-article">
    <div class="article-wrap">
      <div class="article-title-wrap">
        <figure
          v-if="articleInfo.attributes.img.data"
          class="article-main-visual-img-box"
        >
          <img
            :src="articleInfo.attributes.img.data?.attributes.url"
            alt=""
            class="article-main-visual-img"
          />
        </figure>
        <div class="article-title-box">
          <div class="article-title-info-box">
            <div class="article-date-box">
              <time
                class="article-date"
                :datetime="articleInfo.attributes.date"
              >
                {{ utils.getDate(articleInfo.attributes.date) }}
              </time>
            </div>
            <PartsShareList :share-url="shareUrl" />
          </div>
          <h1 class="article-title">{{ articleInfo.attributes.title }}</h1>
        </div>
      </div>
      <div class="article-contents-wrap" v-html="articleContents"></div>
      <div class="article-bottom-wrap">
        <div class="article-bottom-share-box">
          <PartsShareList :share-url="shareUrl" />
        </div>
        <div
          v-if="listPageUrl && listPageText"
          class="article-bottom-list-page-link-box"
        >
          <NuxtLink
            :to="listPageUrl"
            class="primary-btn article-bottom-list-page-link"
          >
            <span class="primary-btn-text">
              {{ listPageText }}
            </span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { marked } from 'marked';
const utils = useUtils();

type Props = {
  articleInfo: {
    id: string;
    attributes: {
      title: string;
      description?: string;
      content?: string;
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
  };
  shareUrl: string;
  listPageUrl?: string;
  listPageText?: string;
};

const { articleInfo, shareUrl, listPageUrl, listPageText } =
  defineProps<Props>();

const articleContents = computed(() => {
  let result: string = '';

  // メニューを表示している場合
  if (utils.isNotEmpty(articleInfo.attributes.content)) {
    result = marked(String(articleInfo.attributes.content));
  }

  return result;
});
</script>

<style lang="scss" scoped>
@use '~/assets/_scss/_global/index' as g;

// 変数
$color-article_date-text: g.$palette-boulder;

$color-article_contents-h2-background: g.$palette-resolution_blue;
$color-article_contents-h2-text: g.$palette-white;

$color-article_contents-h3-border: g.$palette-resolution_blue;

$color-article_contents-pre-background: g.$palette-seashell;
$color-article_contents-pre-border: g.$palette-alto;

$color-article_contents-blockquote-background: g.$palette-seashell;
$color-article_contents-blockquote-border: g.$palette-alto;

.article-main-visual-img {
  width: 100%;
}
.article-title-box {
  margin-top: 24px;
}
.article-title-info-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.article-date {
  font-size: 1.4rem;
  color: $color-article_date-text;
}
.article-title {
  margin-top: 8px;
  font-size: 2.4rem;
}
.article-contents-wrap {
  margin-top: 24px;
  > ::v-deep(*) {
    &:first-child {
      margin-top: 0;
    }
  }
  ::v-deep(h1),
  ::v-deep(h2) {
    margin-top: 24px;
    font-size: 2rem;
    font-weight: 700;
    background-color: $color-article_contents-h2-background;
    color: $color-article_contents-h2-text;
    padding: 8px 16px;
  }
  ::v-deep(h3) {
    margin-top: 24px;
    font-size: 2rem;
    font-weight: 700;
    border-bottom: 4px solid $color-article_contents-h3-border;
    padding-bottom: 4px;
  }
  ::v-deep(h4) {
    margin-top: 16px;
    font-size: 1.8rem;
    font-weight: 700;
  }
  ::v-deep(h5) {
    margin-top: 16px;
    font-size: 1.6rem;
    font-weight: 700;
  }
  ::v-deep(h6) {
    margin-top: 16px;
    font-size: 1.6rem;
    font-weight: 700;
  }
  ::v-deep(p) {
    margin-top: 16px;
  }
  ::v-deep(em) {
    font-weight: 400;
    font-style: italic;
  }
  ::v-deep(strong) {
    font-weight: 700;
  }
  ::v-deep(u) {
    text-decoration: underline;
  }
  ::v-deep(ul) {
    margin-top: 16px;
    padding-left: 24px;
    list-style: disc;
    li {
      &:first-of-type {
        margin-top: 0;
      }
    }
  }
  ::v-deep(ol) {
    margin-top: 16px;
    padding-left: 24px;
    list-style: decimal;
    li {
      &:first-of-type {
        margin-top: 0;
      }
    }
  }
  ::v-deep(li) {
    margin-top: 8px;
  }
  ::v-deep(pre) {
    display: block;
    margin: 16px 0 0;
    padding: 16px;
    font-weight: 400;
    background-color: $color-article_contents-pre-background;
    border: 1px solid $color-article_contents-pre-border;
  }
  ::v-deep(blockquote) {
    display: block;
    margin: 16px 0 0;
    padding: 16px;
    font-weight: 400;
    background-color: $color-article_contents-blockquote-background;
    border-left: 8px solid $color-article_contents-blockquote-border;
    p {
      margin-top: 0;
    }
  }
}
.article-bottom-share-box {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
}
.article-bottom-list-page-link-box {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
}
@include g.mxMediaQuery(g.$bp-sm) {
  .article-date {
    font-size: 1.8rem;
  }
  .article-title {
    font-size: 3.2rem;
  }
  .article-contents-wrap {
    margin-top: 40px;
    ::v-deep(h1),
    ::v-deep(h2) {
      margin-top: 40px;
      font-size: 2.8rem;
    }
    ::v-deep(h3) {
      margin-top: 40px;
      font-size: 2.4rem;
    }
    ::v-deep(h4) {
      margin-top: 24px;
      font-size: 2rem;
    }
    ::v-deep(h5) {
      margin-top: 24px;
      font-size: 1.8rem;
    }
    ::v-deep(h6) {
      margin-top: 24px;
      font-size: 1.8rem;
    }
    ::v-deep(p) {
      margin-top: 24px;
    }
    ::v-deep(ul) {
      margin-top: 24px;
    }
    ::v-deep(ol) {
      margin-top: 24px;
    }
    ::v-deep(li) {
      margin-top: 16px;
    }
    ::v-deep(pre) {
      margin-top: 24px;
    }
    ::v-deep(blockquote) {
      margin-top: 24px;
    }
  }
  .article-bottom-share-box {
    margin-top: 40px;
  }
  .article-bottom-list-page-link-box {
    margin-top: 80px;
  }
}
</style>
