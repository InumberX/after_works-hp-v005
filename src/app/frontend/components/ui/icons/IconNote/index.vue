<template>
  <IconNote class="IconNote" />
</template>

<script setup lang="ts">
import IconNote from '~/assets/img/icon-note.svg'
</script>

<style lang="scss" scoped>
@use '~/assets/_scss/_global/index' as *;

.IconNote {
  fill: $palette-white;
  transition: 0.3s fill;
}
</style>
