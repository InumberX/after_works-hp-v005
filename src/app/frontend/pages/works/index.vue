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
    <CommonBreadcrumb :breadcrumb-infos="breadcrumbInfos" />
  </main>
</template>

<script setup lang="ts">
const { $const } = useNuxtApp();
const config = useRuntimeConfig();
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
</script>