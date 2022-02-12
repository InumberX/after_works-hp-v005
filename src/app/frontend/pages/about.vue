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
      :title="$const.pageInfos.about.title"
      :sub-title="$const.pageInfos.about.subTitle"
    />

    <CommonBreadcrumb :breadcrumb-infos="breadcrumbInfos" />

    <CommonContact />
  </main>
</template>

<script setup lang="ts">
const { $const } = useNuxtApp();
const config = useRuntimeConfig();
const breadcrumbInfos: breadcrumbInfos[] = [
  {
    url: '',
    text: $const.pageInfos.about.title,
  },
];
const meta = <meta>{
  title: $const.pageInfos.about.title + $const.meta.titleTemplate,
  description: $const.pageInfos.about.description,
  ogImage: config.siteUrl + $const.url.imgOgp,
  canonical: config.siteUrl + $const.pageInfos.about.url,
};
</script>
