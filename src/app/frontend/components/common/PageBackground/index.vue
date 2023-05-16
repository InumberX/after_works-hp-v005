<template>
  <div class="LayoutPageBackground" />
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@use '~/assets/_scss/_global/index' as *;

.LayoutPageBackground {
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
</style>
