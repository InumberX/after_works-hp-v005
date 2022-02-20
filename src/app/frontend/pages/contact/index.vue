<template>
  <main class="l-main">
    <PartsPageTitle
      :title="$const.pageInfos.contact.title"
      :sub-title="$const.pageInfos.contact.subTitle"
    />

    <CommonBreadcrumb :breadcrumb-infos="breadcrumbInfos" />

    <div class="l-section is-short">
      <div class="l-inner">
        <PartsLead
          :leads="[
            {
              text: '下記フォームよりお気軽にお問い合わせください。',
            },
          ]"
        />
        <div class="contact-link-box">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfFvT-kuWDU1O45Nr-iq3ldDhH3gqRHO5XKpQlAD9Prw6UfLA/viewform?usp=sf_link"
            class="primary-btn contact-link"
            target="_blank"
            rel="noopener"
          >
            <span class="primary-btn-text">お問い合わせ</span>
          </a>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
const { $const } = useNuxtApp();
const config = useRuntimeConfig();
const breadcrumbInfos: breadcrumbInfos[] = [
  {
    url: '',
    text: $const.pageInfos.contact.title,
  },
];
const meta = <meta>{
  title: $const.pageInfos.contact.title + $const.meta.titleTemplate,
  description: $const.pageInfos.contact.description,
  ogImage: config.siteUrl + $const.url.imgOgp,
  canonical: config.siteUrl + $const.pageInfos.contact.url,
};

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

<style lang="scss" scoped>
@use '~/assets/_scss/_global/index' as g;

.contact-link-box {
  display: flex;
  justify-content: center;
  margin-top: 24px;
}
</style>
