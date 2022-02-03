<template>
  <div>
    <Html lang="ja">
      <Head>
        <Meta name="description" :content="$const.meta.description" />
        <Meta
          name="og:image"
          :content="config.siteUrl + 'assets/img/img-ogp.png'"
        />
        <Meta name="og:site_name" :content="$const.meta.title" />
        <Meta name="og:description" :content="$const.meta.description" />
        <Meta name="twitter:description" :content="$const.meta.description" />
        <Link hid="canonical" rel="canonical" :href="config.siteUrl" />
      </Head>
    </Html>
    <NuxtLink to="/about/">Home page</NuxtLink>
  </div>
</template>

<script setup lang="ts">
const { $const } = useNuxtApp();
const config = useRuntimeConfig();
</script>
