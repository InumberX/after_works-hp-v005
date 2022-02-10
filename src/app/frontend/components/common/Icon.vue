<template>
  <i class="icon" :class="className"></i>
</template>

<script setup lang="ts">
type Props = {
  className: string;
};
const { className } = defineProps<Props>();
</script>

<style lang="scss" scoped>
@use '~/assets/_scss/_global/index' as g;

.icon {
  display: inline-block;
  width: 24px;
  height: 24px;
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
}
.icon-home {
  background-image: url('~/assets/img/icon-home.svg');
}
.icon-article {
  background-image: url('~/assets/img/icon-article.svg');
}
.icon-person {
  background-image: url('~/assets/img/icon-person.svg');
}
.icon-star {
  background-image: url('~/assets/img/icon-star.svg');
}
.icon-mail {
  background-image: url('~/assets/img/icon-mail.svg');
}
</style>
