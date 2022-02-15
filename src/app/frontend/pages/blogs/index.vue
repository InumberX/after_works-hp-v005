<template>
  <main class="l-main">
    <Html lang="ja">
      <Head>
        <Title>{{ meta.title }}</Title>
        <Meta name="description" :content="meta.description" />
        <Meta name="og:image" :content="meta.ogImage" />
        <Meta name="og:site_name" :content="meta.title" />
        <Meta name="og:description" :content="meta.description" />
        <Meta name="twitter:description" :content="meta.description" />
        <Link rel="canonical" :href="meta.canonical" />
      </Head>
    </Html>

    <PartsPageTitle
      :title="$const.pageInfos.blogs.title"
      :sub-title="$const.pageInfos.blogs.subTitle"
    />

    <CommonBreadcrumb :breadcrumb-infos="breadcrumbInfos" />

    <div class="l-parallel">
      <div class="l-inner l-parallel-inner">
        <div class="l-parallel-main">
          <div :id="resultTarget" class="l-parallel-main-section">
            <PartsArticleList
              :article-list-infos="blogInfos"
              :article-url="`${config.baseDir}${$const.pageInfos.blogs.url}`"
              class-name="is-ground-top"
              :paging-info="pagingInfo"
            />
          </div>
        </div>

        <aside class="l-parallel-side">
          <PartsSidebarArticleList />
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
const resultTarget: string = 'article-list';
const breadcrumbInfos: breadcrumbInfos[] = [
  {
    url: '',
    text: $const.pageInfos.blogs.title,
  },
];
const meta = <meta>{
  title: $const.pageInfos.blogs.title + $const.meta.titleTemplate,
  description: $const.pageInfos.blogs.description,
  ogImage: config.siteUrl + $const.url.imgOgp,
  canonical: config.siteUrl + $const.pageInfos.blogs.url,
};
const pagingInfo = ref<pagingInfo>({
  pageUrl: config.baseDir + $const.pageInfos.blogs.url,
  currentPage: 1,
  pageSize: $const.pageSize,
  pageCount: 0,
});

const changePage = (nextPage: number) => {
  pagingInfo.value.currentPage = nextPage;
};

const route = useRoute();
const { query } = route;

if (utils.isNotEmpty(query.p)) {
  changePage(Number(query.p));
}

const variables = computed(() => {
  return {
    page: pagingInfo.value.currentPage,
    pageSize: $const.pageSize,
    tagsLimit: $const.tagsLimit,
  };
});

const blogsResult = await urql.useQuery({
  query: gql`
    query getBlogs($page: Int!, $pageSize: Int!, $tagsLimit: Int!) {
      blogs(
        pagination: { page: $page, pageSize: $pageSize }
        sort: ["createdDate:desc", "id:desc"]
      ) {
        meta {
          pagination {
            pageCount
          }
        }
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
            tags: blog_tags(
              pagination: { limit: $tagsLimit }
              sort: ["id:asc"]
            ) {
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
  variables,
});

pagingInfo.value.pageCount =
  blogsResult.data.value.blogs.meta.pagination.pageCount;

const blogInfos = computed(() => {
  let result = <articleListInfos[]>[];

  if (
    utils.isNotEmpty(blogsResult) &&
    utils.isNotEmpty(blogsResult.data.value)
  ) {
    result = blogsResult.data.value.blogs.data;
  }

  return result;
});

watch(route, () => {
  if (route.path === config.baseDir + $const.pageInfos.blogs.url) {
    const { query } = route;

    if (utils.isNotEmpty(query.p)) {
      changePage(Number(query.p));
    } else {
      changePage(1);
    }

    utils.actSmoothScroll('#' + resultTarget);
  }
});
</script>
