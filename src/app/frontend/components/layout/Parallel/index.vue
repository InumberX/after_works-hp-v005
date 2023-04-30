<template>
  <div class="LayoutParallel">
    <Inner>
      <div class="LayoutParallel__container">
        <div class="LayoutParallel__main">
          <slot name="main" />
        </div>
        <aside class="LayoutParallel__side">
          <slot name="side" />
        </aside>
      </div>
    </Inner>
  </div>
</template>

<script setup lang="ts">
import Inner from '~/components/layout/Inner/index.vue'
</script>

<style lang="scss" scoped>
@use '~/assets/_scss/_global/index' as *;

.LayoutParallel {
  padding-bottom: 40px;

  @include mxMediaQuerySm {
    padding-bottom: 64px;
  }

  @include mxMediaQueryMd {
    padding-bottom: 80px;
  }

  &__container {
    @include mxMediaQueryMd {
      display: flex;
    }
  }

  &__main {
    min-width: 1px;

    @include mxMediaQueryMd {
      flex-grow: 1;
      padding-right: 40px;
    }

    @include mxMediaQueryLg {
      padding-right: 64px;
    }

    @include mxMediaQueryXl {
      flex-grow: 1;
      padding-right: 80px;
    }
  }

  &__side {
    margin-top: 40px;

    @include mxMediaQueryMd {
      margin-top: 0;
      flex-shrink: 0;
      width: 320px;
    }
  }
}
</style>
