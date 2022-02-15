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
      :title="$const.pageInfos.works.title"
      :sub-title="$const.pageInfos.works.subTitle"
    />

    <CommonBreadcrumb :breadcrumb-infos="breadcrumbInfos" />

    <div class="l-section is-short">
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
      />
    </div>

    <div class="l-section is-short">
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
        :article-list-infos="hobbyInfos"
        :article-url="`${config.baseDir}${$const.pageInfos.works.url}`"
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

const variables = computed(() => {
  return {
    tagsLimit: $const.tagsLimit,
  };
});

const worksResult = await urql.useQuery({
  query: gql`
    query getWorks($tagsLimit: Int!) {
      works(sort: ["createdDate:desc", "id:desc"]) {
        data {
          id
          attributes {
            title
            from
            to
            flgHobby
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

const workInfos = computed(() => {
  let result = <articleListInfos[]>[];

  if (
    utils.isNotEmpty(worksResult) &&
    utils.isNotEmpty(worksResult.data.value)
  ) {
    for (
      let i: number = 0,
        iLength: number = worksResult.data.value.works.data.length;
      i < iLength;
      i = (i + 1) | 0
    ) {
      if (!worksResult.data.value.works.data[i].attributes.flgHobby) {
        result.push(worksResult.data.value.works.data[i]);
      }
    }
  }

  return result;
});

const hobbyInfos = computed(() => {
  let result = <articleListInfos[]>[];

  if (
    utils.isNotEmpty(worksResult) &&
    utils.isNotEmpty(worksResult.data.value)
  ) {
    for (
      let i: number = 0,
        iLength: number = worksResult.data.value.works.data.length;
      i < iLength;
      i = (i + 1) | 0
    ) {
      if (worksResult.data.value.works.data[i].attributes.flgHobby) {
        result.push(worksResult.data.value.works.data[i]);
      }
    }
  }

  return result;
});
</script>
