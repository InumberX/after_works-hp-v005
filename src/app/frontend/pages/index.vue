<template>
  <LayoutMain> </LayoutMain>
</template>

<script setup lang="ts">
import { routes } from '~/config/routes'
import LayoutMain from '~/components/layout/Main/index.vue'

const { initIntersectionObserver, disconnectInitIntersectionObserver } = useIntersectionObserver()
const config = useRuntimeConfig()
const { siteUrl } = config.public
const { getTitleTemplate, getDescription, getOgImage } = useUtils()

const route = routes.top

useHead({
  title: getTitleTemplate(route.title),
  meta: [
    {
      key: 'ogTitle',
      property: 'og:title',
      content: getTitleTemplate(route.title),
    },
    {
      key: 'description',
      name: 'description',
      content: getDescription(route.description),
    },
    {
      key: 'ogDescription',
      name: 'og:description',
      content: getDescription(route.description),
    },
    {
      key: 'ogImage',
      property: 'og:image',
      content: getOgImage(),
    },
  ],
  link: [
    {
      key: 'canonical',
      rel: 'canonical',
      href: `${siteUrl}${route.url({})}`,
    },
  ],
})

onMounted(() => {
  initIntersectionObserver()
})

onBeforeUnmount(() => {
  disconnectInitIntersectionObserver()
})
</script>
