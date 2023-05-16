<template>
  <IconQiita class="IconQiita" />
</template>

<script setup lang="ts">
import IconQiita from '~/assets/img/icon-qiita.svg'
</script>

<style lang="scss" scoped>
@use '~/assets/_scss/_global/index' as *;

.IconQiita {
  fill: $palette-white;
  transition: 0.3s fill;
}
</style>
