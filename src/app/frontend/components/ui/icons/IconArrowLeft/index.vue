<template>
  <IconArrowLeft class="IconArrowLeft" />
</template>

<script setup lang="ts">
import IconArrowLeft from '~/assets/img/icon-arrow_left.svg'
</script>

<style lang="scss" scoped>
@use '~/assets/_scss/_global/index' as *;

.IconArrowLeft {
  fill: url('#svg-painter-gradient-primary-left');
  transition: 0.3s fill;
}
</style>
