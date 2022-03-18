<template>
  <main class="l-main">
    <CommonBreadcrumb :breadcrumb-infos="breadcrumbInfos" />

    <div class="l-parallel">
      <div class="l-inner l-parallel-inner">
        <div class="l-parallel-main">
          <div class="l-parallel-main-section">
            <PartsArticle
              :article-info="blogInfo"
              :share-url="meta.canonical"
              :list-page-url="`${config.baseDir}${$const.pageInfos.blogs.url}`"
              list-page-text="ブログ一覧"
            />
          </div>
        </div>

        <aside class="l-parallel-side">
          <PartsSidebarArticleList
            :list-page-url="`${config.baseDir}${$const.pageInfos.blogs.url}`"
            list-page-text="ブログ一覧"
          />
          <PartsSidebarAdSenseList v-if="!isPageTransitionFirstTime" />
        </aside>
      </div>
    </div>

    <CommonContact />
  </main>
</template>

<script setup lang="ts">
import { useClientHandle, gql } from '@urql/vue';
const urql = useClientHandle();
const { $const } = useNuxtApp();
const config = useRuntimeConfig();
const utils = useUtils();
const route = useRoute();

const blogResult = await urql.useQuery({
  query: gql`
    query getBlog($id: ID!) {
      blog(id: $id) {
        data {
          id
          attributes {
            title
            description
            content
            date: createdDate
            img {
              data {
                id
                attributes {
                  url
                }
              }
            }
            tags: blog_tags(sort: ["id:asc"]) {
              data {
                id
                attributes {
                  name
                }
              }
            }
          }
        }
      }
    }
  `,
  variables: {
    id: route.params.id,
  },
});

const breadcrumbInfos: breadcrumbInfos[] = [
  {
    url: config.baseDir + $const.pageInfos.blogs.url,
    text: $const.pageInfos.blogs.title,
  },
  {
    url: '',
    text: blogResult.data.value.blog.data.attributes.title,
  },
];

const meta = <meta>{
  title:
    blogResult.data.value.blog.data.attributes.title +
    $const.meta.pageSeparator +
    $const.pageInfos.blogs.title +
    $const.meta.titleTemplate,
  description: `東京都在住のフロントエンドエンジニア：N/NE（ナイン）のポートフォリオ用Webサイトです。このページでは、私が投稿した「${blogResult.data.value.blog.data.attributes.title}」の記事を閲覧できます。`,
  ogImage: config.siteUrl + $const.url.imgOgp,
  canonical:
    config.siteUrl + $const.pageInfos.blogs.url + route.params.id + '/',
};

if (utils.isNotEmpty(blogResult.data.value.blog.data.attributes.description)) {
  meta.description = blogResult.data.value.blog.data.attributes.description;
}

if (utils.isNotEmpty(blogResult.data.value.blog.data.attributes.img.data)) {
  let url = blogResult.data.value.blog.data.attributes.img.data.attributes.url;

  if (url.indexOf('/') === 0) {
    url = url.slice(1);
  }

  meta.ogImage = config.siteUrl + url;
}

const blogInfo = <articleListInfos>blogResult.data.value.blog.data;

const isPageTransitionFirstTime = computed(() => {
  return utils.vars.value.isPageTransitionFirstTime;
});

useMeta({
  title: meta.title,
  meta: [
    {
      name: 'description',
      content: meta.description,
    },
    {
      property: 'og:image',
      content: meta.ogImage,
    },
    {
      property: 'og:title',
      content: meta.title,
    },
    {
      property: 'og:description',
      content: meta.description,
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: meta.canonical,
    },
  ],
});
</script>
