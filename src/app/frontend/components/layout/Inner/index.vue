<template>
  <div class="LayoutInner">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@use '~/assets/_scss/_global/index' as *;

.LayoutInner {
  margin: 0 auto;
  width: 100%;
  max-width: calc(1400px + (32px * 2));
  padding: 0 4vw;

  @include mxMediaQuerySm {
    padding: 0 4.6vw;
  }

  @include mxMediaQueryMd {
    padding: 0 32px;
  }
}
</style>
