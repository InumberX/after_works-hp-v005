<template>
  <div class="LayoutContainer">
    <Header />
    <slot />
    <Footer />
    <div id="modals" class="LayoutModals" />
  </div>
</template>

<script setup lang="ts">
import Header from '~/components/common/Header/index.vue';
import Footer from '~/components/common/Footer/index.vue';
</script>

<style lang="scss" scoped>
@use '~/assets/_scss/_global/index' as g;

.LayoutContainer {
  display: flex;
  flex-direction: column;
  min-height: 100svh;
  min-height: 100vh;
}
</style>
