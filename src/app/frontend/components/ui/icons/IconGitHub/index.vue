<template>
  <IconGitHub class="IconGitHub" />
</template>

<script setup lang="ts">
import IconGitHub from '~/assets/img/icon-github.svg'
</script>

<style lang="scss" scoped>
@use '~/assets/_scss/_global/index' as *;

.IconGitHub {
  fill: $palette-white;
  transition: 0.3s fill;
}
</style>
