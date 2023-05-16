<template>
  <IconArrowRight class="IconArrowRight" />
</template>

<script setup lang="ts">
import IconArrowRight from '~/assets/img/icon-arrow_right.svg'
</script>

<style lang="scss" scoped>
@use '~/assets/_scss/_global/index' as *;

.IconArrowRight {
  fill: url('#svg-painter-gradient-primary-right');
  transition: 0.3s fill;
}
</style>
