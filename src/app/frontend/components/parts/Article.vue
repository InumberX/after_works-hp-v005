<template>
  <article class="l-article">
    <div class="article-wrap">
      <div
        class="article-title-wrap"
        :class="[{ 'is-parallel': flgMainVisualParallel }]"
      >
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
              <template
                v-if="articleInfo.attributes.from || articleInfo.attributes.to"
              >
                <time
                  v-if="articleInfo.attributes.from"
                  class="article-date"
                  :datetime="articleInfo.attributes.from"
                >
                  {{ utils.getDate(articleInfo.attributes.from) }}
                </time>
                <template v-if="articleInfo.attributes.to">
                  〜
                  <time
                    class="article-date"
                    :datetime="articleInfo.attributes.to"
                  >
                    {{ utils.getDate(articleInfo.attributes.to) }}
                  </time>
                </template>
              </template>
              <time
                v-else
                class="article-date"
                :datetime="articleInfo.attributes.date"
              >
                {{ utils.getDate(articleInfo.attributes.date) }}
              </time>
            </div>
            <PartsShareList v-if="isShowShareListTop" :share-url="shareUrl" />
          </div>
          <div
            v-if="
              articleInfo.attributes.tags &&
              articleInfo.attributes.tags.data &&
              articleInfo.attributes.tags.data.length > 0
            "
            class="article-tag-box"
          >
            <ul class="article-tag-items">
              <li
                v-for="tag in articleInfo.attributes.tags.data"
                :key="tag.id"
                class="article-tag-item"
              >
                <span class="article-tag">
                  {{ tag.attributes.name }}
                </span>
              </li>
            </ul>
          </div>
          <h1 class="article-title">{{ articleInfo.attributes.title }}</h1>
          <div v-if="articleInfo.attributes.url" class="article-work-link-box">
            <a
              :href="articleInfo.attributes.url"
              class="article-work-link"
              target="_blank"
              rel="noopener"
            >
              <span class="article-work-link-text">
                {{ articleInfo.attributes.url }}
              </span>
              <CommonIcon class-name="icon-open_in_new" />
            </a>
          </div>
          <ClientOnly>
            <PartsShareList
              v-if="isShowShareListBottom"
              :share-url="shareUrl"
            />
            <template
              v-if="
                articleInfo.attributes.positions &&
                articleInfo.attributes.positions.data &&
                articleInfo.attributes.positions.data.length > 0
              "
            >
              <div class="article-work-tag-box">
                <dl class="article-work-tag-item">
                  <dt class="article-work-tag-title">担当箇所</dt>
                  <dd class="article-work-tag-contents">
                    <ul class="article-tag-items">
                      <li
                        v-for="position in articleInfo.attributes.positions
                          .data"
                        :key="position.id"
                        class="article-tag-item"
                      >
                        <span class="article-tag">
                          {{ position.attributes.name }}
                        </span>
                      </li>
                    </ul>
                  </dd>
                </dl>
              </div>
            </template>
            <template
              v-if="
                (articleInfo.attributes.programs &&
                  articleInfo.attributes.programs.data &&
                  articleInfo.attributes.programs.data.length > 0) ||
                (articleInfo.attributes.cmses &&
                  articleInfo.attributes.cmses.data &&
                  articleInfo.attributes.cmses.data.length > 0) ||
                (articleInfo.attributes.designs &&
                  articleInfo.attributes.designs.data &&
                  articleInfo.attributes.designs.data.length > 0) ||
                (articleInfo.attributes.others &&
                  articleInfo.attributes.others.data &&
                  articleInfo.attributes.others.data.length > 0)
              "
            >
              <div class="article-work-tag-box">
                <dl class="article-work-tag-item">
                  <dt class="article-work-tag-title">使用技術</dt>
                  <dd class="article-work-tag-contents">
                    <ul class="article-tag-items">
                      <template
                        v-if="
                          articleInfo.attributes.programs &&
                          articleInfo.attributes.programs.data &&
                          articleInfo.attributes.programs.data.length > 0
                        "
                      >
                        <li
                          v-for="program in articleInfo.attributes.programs
                            .data"
                          :key="program.id"
                          class="article-tag-item"
                        >
                          <span class="article-tag">
                            {{ program.attributes.name }}
                          </span>
                        </li>
                      </template>
                      <template
                        v-if="
                          articleInfo.attributes.cmses &&
                          articleInfo.attributes.cmses.data &&
                          articleInfo.attributes.cmses.data.length > 0
                        "
                      >
                        <li
                          v-for="cms in articleInfo.attributes.cmses.data"
                          :key="cms.id"
                          class="article-tag-item"
                        >
                          <span class="article-tag">
                            {{ cms.attributes.name }}
                          </span>
                        </li>
                      </template>
                      <template
                        v-if="
                          articleInfo.attributes.designs &&
                          articleInfo.attributes.designs.data &&
                          articleInfo.attributes.designs.data.length > 0
                        "
                      >
                        <li
                          v-for="design in articleInfo.attributes.designs.data"
                          :key="design.id"
                          class="article-tag-item"
                        >
                          <span class="article-tag">
                            {{ design.attributes.name }}
                          </span>
                        </li>
                      </template>
                      <template
                        v-if="
                          articleInfo.attributes.others &&
                          articleInfo.attributes.others.data &&
                          articleInfo.attributes.others.data.length > 0
                        "
                      >
                        <li
                          v-for="other in articleInfo.attributes.others.data"
                          :key="other.id"
                          class="article-tag-item"
                        >
                          <span class="article-tag">
                            {{ other.attributes.name }}
                          </span>
                        </li>
                      </template>
                    </ul>
                  </dd>
                </dl>
              </div>
            </template>
          </ClientOnly>
        </div>
      </div>
      <div
        class="article-contents-wrap"
        v-html="utils.replaceNewLine(articleContents)"
      ></div>
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
import { useBreakpoints } from '~/composables/useBreakpoints';
import { marked } from 'marked';
const utils = useUtils();
const { breakpoints } = useBreakpoints();

type Props = {
  articleInfo: articleListInfos;
  shareUrl: string;
  listPageUrl?: string;
  listPageText?: string;
  flgMainVisualParallel?: boolean;
};

const {
  articleInfo,
  shareUrl,
  listPageUrl,
  listPageText,
  flgMainVisualParallel,
} = defineProps<Props>();

const isShowShareListTop = computed(() => {
  let result: boolean = false;
  if (
    !flgMainVisualParallel ||
    (flgMainVisualParallel &&
      (breakpoints.value.flg.xxs ||
        breakpoints.value.flg.xs ||
        breakpoints.value.flg.sm))
  ) {
    result = true;
  }

  return result;
});

const isShowShareListBottom = computed(() => {
  let result: boolean = false;
  if (
    flgMainVisualParallel &&
    (breakpoints.value.flg.md ||
      breakpoints.value.flg.lg ||
      breakpoints.value.flg.xl ||
      breakpoints.value.flg.xxl)
  ) {
    result = true;
  }

  return result;
});

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

$color-article_tag-background: g.$palette-seashell;
$color-article_tag-text: g.$palette-boulder;

$color-article_work_link-text: g.$palette-boulder;

$color-article_work_tag_title-text: g.$palette-boulder;

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
.article-date-box {
  display: flex;
  align-items: center;
  padding-right: 8px;
  flex-shrink: 0;
}
.article-date {
  font-size: 1.4rem;
  color: $color-article_date-text;
}
.article-title {
  margin-top: 8px;
  font-size: 2.4rem;
}
.article-tag-box {
  margin-top: 8px;
}
.article-tag-items {
  display: flex;
  flex-wrap: wrap;
  margin: -4px -8px -4px 0;
}
.article-tag-item {
  margin: 4px 8px 4px 0;
}
.article-tag {
  display: block;
  font-size: 1rem;
  color: $color-article_tag-text;
  background-color: $color-article_tag-background;
  border-radius: 4px;
  padding: 1px 8px;
}
.article-work-link-box {
  margin-top: 12px;
  display: flex;
}
.article-work-link:not(:root) {
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  color: $color-article_work_link-text;
  &:hover {
    opacity: g.$opacity-main;
  }
}
.article-work-tag-box {
  margin-top: 16px;
}
.article-work-tag-item {
  display: flex;
}
.article-work-tag-title {
  font-size: 1.4rem;
  font-weight: 700;
  flex-shrink: 0;
  min-width: 72px;
  padding-right: 8px;
  color: $color-article_work_tag_title-text;
}
.article-work-tag-contents {
  padding-top: 2px;
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
@include g.mxMediaQuery(g.$bp-md) {
  .article-title-wrap {
    &.is-parallel {
      display: flex;
      .article-main-visual-img-box {
        width: 400px;
        margin-right: 24px;
        flex-shrink: 0;
      }
      .article-title-box {
        margin-top: 0;
      }
      .share-list-box {
        margin-top: 24px;
      }
    }
  }
}
@include g.mxMediaQuery(g.$bp-lg) {
  .article-title-wrap {
    &.is-parallel {
      .article-main-visual-img-box {
        width: 640px;
      }
    }
  }
}
</style>
