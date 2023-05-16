<template>
  <IconInstagram class="IconInstagram" />
</template>

<script setup lang="ts">
import IconInstagram from '~/assets/img/icon-instagram.svg'
</script>

<style lang="scss" scoped>
@use '~/assets/_scss/_global/index' as *;

.IconInstagram {
  fill: $palette-white;
  transition: 0.3s fill;
}
</style>
