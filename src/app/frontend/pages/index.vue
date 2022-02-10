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

    <section class="l-section">
      <PartsSectionTitle title="ブログ" sub-title="Blog" />
    </section>
  </main>
</template>

<script setup lang="ts">
const { $const } = useNuxtApp();
const config = useRuntimeConfig();
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
</script>
