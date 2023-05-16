<template>
  <IconArrowBottom class="IconArrowBottom" />
</template>

<script setup lang="ts">
import IconArrowBottom from '~/assets/img/icon-arrow_bottom.svg'
</script>

<style lang="scss" scoped>
@use '~/assets/_scss/_global/index' as *;

.IconArrowBottom {
  fill: url('#svg-painter-gradient-primary-bottom');
  transition: 0.3s fill;
}
</style>
