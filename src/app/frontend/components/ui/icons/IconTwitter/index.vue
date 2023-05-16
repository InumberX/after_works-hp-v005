<template>
  <IconTwitter class="IconTwitter" />
</template>

<script setup lang="ts">
import IconTwitter from '~/assets/img/icon-twitter.svg'
</script>

<style lang="scss" scoped>
@use '~/assets/_scss/_global/index' as *;

.IconTwitter {
  fill: $palette-white;
  transition: 0.3s fill;
}
</style>
