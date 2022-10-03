<template>
  <main class="l-main">
    <CommonBreadcrumb :breadcrumb-infos="breadcrumbInfos" />

    <div class="l-section is-short">
      <div class="l-inner">
        <PartsArticle
          :article-info="workInfo"
          :share-url="meta.canonical"
          :list-page-url="`${config.baseDir}${$const.pageInfos.works.url}`"
          list-page-text="実績一覧"
          :flg-main-visual-parallel="true"
          wrapper-type="short"
        />
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

const workResult = await urql.useQuery({
  query: gql`
    query getWork($id: ID!) {
      work(id: $id) {
        data {
          id
          attributes {
            title
            description
            content
            from
            to
            url
            img {
              data {
                id
                attributes {
                  url
                }
              }
            }
            positions: position_tags(sort: ["id:asc"]) {
              data {
                id
                attributes {
                  name
                }
              }
            }
            programs: program_tags(sort: ["id:asc"]) {
              data {
                id
                attributes {
                  name
                }
              }
            }
            cmses: cms_tags(sort: ["id:asc"]) {
              data {
                id
                attributes {
                  name
                }
              }
            }
            designs: design_tags(sort: ["id:asc"]) {
              data {
                id
                attributes {
                  name
                }
              }
            }
            others: other_tags(sort: ["id:asc"]) {
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
    url: config.baseDir + $const.pageInfos.works.url,
    text: $const.pageInfos.works.title,
  },
  {
    url: '',
    text: workResult.data.value.work.data.attributes.title,
  },
];

const meta = <meta>{
  title:
    workResult.data.value.work.data.attributes.title +
    $const.meta.pageSeparator +
    $const.pageInfos.works.title +
    $const.meta.titleTemplate,
  description: `東京都在住のフロントエンドエンジニア：N/NE（ナイン）のポートフォリオ用Webサイトです。このページでは、「${workResult.data.value.work.data.attributes.title}」の実績について閲覧できます。`,
  ogImage: config.siteUrl + $const.url.imgOgp,
  canonical:
    config.siteUrl + $const.pageInfos.works.url + route.params.id + '/',
};

if (utils.isNotEmpty(workResult.data.value.work.data.attributes.description)) {
  meta.description = workResult.data.value.work.data.attributes.description;
}

if (utils.isNotEmpty(workResult.data.value.work.data.attributes.img.data)) {
  let url = workResult.data.value.work.data.attributes.img.data.attributes.url;

  if (url.indexOf('/') === 0) {
    url = url.slice(1);
  }

  meta.ogImage = config.siteUrl + url;
}

const workInfo = <articleListInfos>workResult.data.value.work.data;

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
