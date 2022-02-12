<template>
  <div class="sidebar-title-box">
    <h2 class="sidebar-title-main">{{ title }}</h2>
  </div>
</template>

<script setup lang="ts">
type Props = {
  title: string;
};
const { title } = defineProps<Props>();
</script>

<style lang="scss" scoped>
@use '~/assets/_scss/_global/index' as g;

.sidebar-title-main {
  font-size: 2rem;
  font-weight: 700;
}
</style>
