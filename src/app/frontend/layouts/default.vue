<template>
  <div class="LayoutContainer">
    <Header />
    <slot />
    <Footer />
    <div id="modals" class="LayoutModals" />
    <div class="LayoutContainer__background" />
  </div>
</template>

<script setup lang="ts">
import Header from '~/components/common/Header/index.vue'
import Footer from '~/components/common/Footer/index.vue'
</script>

<style lang="scss" scoped>
@use '~/assets/_scss/_global/index' as *;

.LayoutContainer {
  display: flex;
  flex-direction: column;
  min-height: 100svh;
  min-height: 100vh;

  &__background {
    position: fixed;
    z-index: $z-index-minus-1;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-image: url('~/assets/img/img-page_background.png');
    background-repeat: no-repeat;
    background-position: center top;
    background-size: cover;
  }
}
</style>
