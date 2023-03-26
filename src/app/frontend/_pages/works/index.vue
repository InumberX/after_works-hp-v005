<template>
  <main class="l-main">
    <PartsPageTitle
      :title="$const.pageInfos.works.title"
      :sub-title="$const.pageInfos.works.subTitle"
    />

    <CommonBreadcrumb :breadcrumb-infos="breadcrumbInfos" />

    <div :id="resultTarget" class="l-section is-short">
      <div class="fragment">
        <div class="l-inner">
          <PartsLead
            :leads="[
              {
                text: 'お客さまよりご依頼をいただき制作したものをご紹介します。',
              },
            ]"
          />
        </div>
      </div>
      <PartsArticleList
        :article-list-infos="workInfos"
        :article-url="`${config.baseDir}${$const.pageInfos.works.url}`"
        :paging-info="pagingInfo"
      />
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
const resultTarget: string = 'work-list';
const breadcrumbInfos: breadcrumbInfos[] = [
  {
    url: '',
    text: $const.pageInfos.works.title,
  },
];
const meta = <meta>{
  title: $const.pageInfos.works.title + $const.meta.titleTemplate,
  description: $const.pageInfos.works.description,
  ogImage: config.siteUrl + $const.url.imgOgp,
  canonical: config.siteUrl + $const.pageInfos.works.url,
};

const pagingInfo = ref<pagingInfo>({
  pageUrl: config.baseDir + $const.pageInfos.works.url,
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

const worksResult = await urql.useQuery({
  query: gql`
    query getWorks($page: Int!, $pageSize: Int!, $tagsLimit: Int!) {
      works(
        pagination: { page: $page, pageSize: $pageSize }
        sort: ["createdDate:desc", "id:desc"]
        filters: {
          flgHobby: {
            eq: false
          }
        }
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
            from
            to
            img {
              data {
                attributes {
                  url
                }
              }
            }
            tags: position_tags(
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
  worksResult.data.value.works.meta.pagination.pageCount;

const workInfos = computed(() => {
  let result = <articleListInfos[]>[];

  if (
    utils.isNotEmpty(worksResult) &&
    utils.isNotEmpty(worksResult.data.value)
  ) {
    result = worksResult.data.value.works.data;
  }

  return result;
});

watch(route, () => {
  if (route.path === config.baseDir + $const.pageInfos.works.url) {
    const { query } = route;

    if (utils.isNotEmpty(query.p)) {
      changePage(Number(query.p));
    } else {
      changePage(1);
    }

    utils.actSmoothScroll('#' + resultTarget);
  }
});

useHead({
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
