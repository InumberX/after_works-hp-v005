<template>
  <main class="l-main">
    <PartsPageTitle
      :title="$const.pageInfos.hobby.title"
      :sub-title="$const.pageInfos.hobby.subTitle"
    />

    <CommonBreadcrumb :breadcrumb-infos="breadcrumbInfos" />

    <div :id="resultTarget" class="l-section is-short">
      <div class="fragment">
        <div class="l-inner">
          <PartsLead
            :leads="[
              {
                text: '私の趣味および学習のために制作したものをご紹介します。',
              },
            ]"
          />
        </div>
      </div>
      <PartsArticleList
        :article-list-infos="hobbiesInfos"
        :article-url="`${config.baseDir}${$const.pageInfos.hobby.url}`"
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
const resultTarget: string = 'hobby-list';
const breadcrumbInfos: breadcrumbInfos[] = [
  {
    url: '',
    text: $const.pageInfos.hobby.title,
  },
];
const meta = <meta>{
  title: $const.pageInfos.hobby.title + $const.meta.titleTemplate,
  description: $const.pageInfos.hobby.description,
  ogImage: config.siteUrl + $const.url.imgOgp,
  canonical: config.siteUrl + $const.pageInfos.hobby.url,
};

const pagingInfo = ref<pagingInfo>({
  pageUrl: config.baseDir + $const.pageInfos.hobby.url,
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

const hobbiesResult = await urql.useQuery({
  query: gql`
    query getHobbies($page: Int!, $pageSize: Int!, $tagsLimit: Int!) {
      works(
        pagination: { page: $page, pageSize: $pageSize }
        sort: ["createdDate:desc", "id:desc"]
        filters: { flgHobby: { eq: true } }
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
  hobbiesResult.data.value.works.meta.pagination.pageCount;

const hobbiesInfos = computed(() => {
  let result = <articleListInfos[]>[];

  if (
    utils.isNotEmpty(hobbiesResult) &&
    utils.isNotEmpty(hobbiesResult.data.value)
  ) {
    result = hobbiesResult.data.value.works.data;
  }

  return result;
});

watch(route, () => {
  if (route.path === config.baseDir + $const.pageInfos.hobby.url) {
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
