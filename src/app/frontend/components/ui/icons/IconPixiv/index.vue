<template>
  <IconPixiv class="IconPixiv" />
</template>

<script setup lang="ts">
import IconPixiv from '~/assets/img/icon-pixiv.svg'
</script>

<style lang="scss" scoped>
@use '~/assets/_scss/_global/index' as *;

.IconPixiv {
  fill: $palette-white;
  transition: 0.3s fill;
}
</style>
