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
    </section>

    <section class="l-section">
      <PartsSectionTitle title="コンテンツ" sub-title="Contents" />
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
</script>
