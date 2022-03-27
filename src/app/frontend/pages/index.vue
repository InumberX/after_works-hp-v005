<template>
  <main class="l-main">
    <PartsMainVisual />

    <PartsMessage />

    <section class="l-section">
      <PartsSectionTitle title="提供サービス" sub-title="Service" />
      <PartsCardList :card-list-infos="serviceInfos" />
    </section>

    <section class="l-section">
      <PartsSectionTitle title="コンテンツ" sub-title="Contents" />
      <PartsCardList :card-list-infos="contentsInfos" />
    </section>

    <section v-if="blogInfos.length > 0" class="l-section">
      <PartsSectionTitle title="ブログ" sub-title="Blog" />
      <PartsArticleList
        :article-list-infos="blogInfos"
        :article-url="`${config.baseDir}${$const.pageInfos.blogs.url}`"
        :list-page-url="`${config.baseDir}${$const.pageInfos.blogs.url}`"
        list-page-text="ブログ一覧"
        class-name="is-horizontality"
      />
    </section>

    <CommonContact />
  </main>
</template>

<script setup lang="ts">
import { useClientHandle, gql } from '@urql/vue';
const urql = useClientHandle();
const { $const } = useNuxtApp();
const config = useRuntimeConfig();
const utils = useUtils();
const meta = <meta>{
  title: $const.pageInfos.top.title,
  description: $const.pageInfos.top.description,
  ogImage: config.siteUrl + $const.url.imgOgp,
  canonical: config.siteUrl,
};

const serviceInfos: cardListInfos[] = [
  {
    title: 'デザイン',
    iconClassName: 'icon-palette',
    texts: [
      'お客様のご要望にもとづき、デザインを作成いたします。',
      '実装可能なデザイン、実際の運用に耐えるデザインを制作することを心がけています。',
      '見た目と使いやすさの両面を考慮し、ユーザにとって最適なデザインをご提案いたします。',
    ],
  },
  {
    title: 'コーディング',
    iconClassName: 'icon-laptop',
    texts: [
      'デザインをもとにコーディングを行います。',
      'パソコン・スマートフォンなど様々なデバイスで最適なデザインを表示できるレスポンシブサイト、Wordpressを用いた更新性の高いサイト、JavaScriptを用いた動きのあるサイトなどお客様のご要望に合わせて様々なサイトが制作可能です。',
    ],
  },
];

const contentsInfos: cardListInfos[] = [
  {
    title: '経歴紹介',
    iconClassName: 'icon-person',
    texts: ['これまでの経歴や保有資格などをご紹介いたします。'],
    url: config.baseDir + $const.pageInfos.about.url,
    linkText: 'About',
  },
  {
    title: '実績紹介',
    iconClassName: 'icon-star',
    texts: [
      'これまでにお客様からご依頼を受けて制作したものや趣味で制作した作品について、ご紹介いたします。',
    ],
    url: config.baseDir + $const.pageInfos.works.url,
    linkText: 'Works',
  },
];

const blogsResult = await urql.useQuery({
  query: gql`
    query getBlogs($tagsLimit: Int!) {
      blogs(pagination: { limit: 3 }, sort: ["createdDate:desc", "id:desc"]) {
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
            tags: blog_tags(pagination: { limit: $tagsLimit }) {
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
    tagsLimit: $const.tagsLimit,
  },
});

const blogInfos = ref<articleListInfos[]>([]);

if (
  utils.isNotEmpty(blogsResult.data.value.blogs) &&
  utils.isNotEmpty(blogsResult.data.value.blogs.data)
) {
  blogInfos.value = blogsResult.data.value.blogs.data;
}

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
