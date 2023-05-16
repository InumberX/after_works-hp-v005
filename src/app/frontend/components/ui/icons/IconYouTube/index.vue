<template>
  <IconYouTube class="IconYouTube" />
</template>

<script setup lang="ts">
import IconYouTube from '~/assets/img/icon-youtube.svg'
</script>

<style lang="scss" scoped>
@use '~/assets/_scss/_global/index' as *;

.IconYouTube {
  fill: $palette-white;
  transition: 0.3s fill;
}
</style>
