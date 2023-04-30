<template>
  <Component :is="tagName" class="LayoutSection" :class="[elmType ? 'LayoutSection--' + elmType : '']">
    <slot />
  </Component>
</template>

<script setup lang="ts">
type Props = {
  tagName?: string
  elmType?: 'first'
}

const { tagName } = withDefaults(defineProps<Props>(), {
  tagName: 'section',
})
</script>

<style lang="scss" scoped>
@use '~/assets/_scss/_global/index' as *;

.LayoutSection {
  margin: 0;
  width: 100%;
  padding: 40px 0;

  @include mxMediaQuerySm {
    padding: 64px 0;
  }

  @include mxMediaQueryMd {
    padding: 80px 0;
  }

  &--first {
    padding-top: 24px;

    @include mxMediaQuerySm {
      padding-top: 32px;
    }

    @include mxMediaQueryMd {
      padding-top: 40px;
    }
  }
}
</style>
