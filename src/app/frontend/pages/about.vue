<template>
  <main class="l-main">
    <Html lang="ja">
      <Head>
        <Title>{{ meta.title }}{{ $const.meta.titleTemplate }}</Title>
        <Meta name="description" :content="meta.description" />
        <Meta
          name="og:image"
          :content="`${config.siteUrl}assets/img/img-ogp.png`"
        />
        <Meta
          name="og:site_name"
          :content="`${meta.title}${$const.meta.titleTemplate}`"
        />
        <Meta name="og:description" :content="meta.description" />
        <Meta name="twitter:description" :content="meta.description" />
        <Link
          hid="canonical"
          rel="canonical"
          :href="`${config.siteUrl}${meta.url}`"
        />
      </Head>
    </Html>
    bbb
    <NuxtLink to="/">Home page</NuxtLink>
  </main>
</template>

<script setup lang="ts">
const { $const } = useNuxtApp();
const config = useRuntimeConfig();
const meta = {
  url: 'about/',
  title: '経歴紹介',
  description:
    '東京都在住のフロントエンドエンジニア：N/NE（ナイン）のポートフォリオ用Webサイトです。このページでは、私のプロフィールやこれまでの経験、担当業務等をご紹介します。',
};
</script>
