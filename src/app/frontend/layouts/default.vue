<template>
  <div class="LayoutContainer">
    <Header />
    <slot />
    <Footer />
    <LayoutModals />
    <LayoutPageBackground />
    <LayoutSvgPainter />
  </div>
</template>

<script setup lang="ts">
import Header from '~/components/common/Header/index.vue'
import Footer from '~/components/common/Footer/index.vue'
import LayoutModals from '~/components/common/Modals/index.vue'
import LayoutPageBackground from '~/components/common/PageBackground/index.vue'
import LayoutSvgPainter from '~/components/common/SvgPainter/index.vue'
</script>

<style lang="scss" scoped>
@use '~/assets/_scss/_global/index' as *;

.LayoutContainer {
  display: flex;
  flex-direction: column;
  min-height: 100svh;
  min-height: 100vh;
}
</style>
