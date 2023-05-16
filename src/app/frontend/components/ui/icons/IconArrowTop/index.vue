<template>
  <IconArrowTop class="IconArrowTop" />
</template>

<script setup lang="ts">
import IconArrowTop from '~/assets/img/icon-arrow_top.svg'
</script>

<style lang="scss" scoped>
@use '~/assets/_scss/_global/index' as *;

.IconArrowTop {
  fill: url('#svg-painter-gradient-primary-top');
  transition: 0.3s fill;
}
</style>
