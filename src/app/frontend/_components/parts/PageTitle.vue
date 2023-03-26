<template>
  <div class="l-page-title">
    <div class="l-inner">
      <div class="page-title-box">
        <span v-if="subTitle" class="page-title-sub">{{ subTitle }}</span>
        <h1 class="page-title-main">{{ title }}</h1>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Props = {
  title: string;
  subTitle?: string;
};
const { title, subTitle } = defineProps<Props>();
</script>

<style lang="scss" scoped>
@use '~/assets/_scss/_global/index' as g;

// 変数
$color-page_title_box-text: g.$palette-white;

.l-page-title {
  background-image: url('~/assets/img/img-bg-page_title.jpg');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}
.page-title-box {
  padding: 24px 0;
  color: $color-page_title_box-text;
}
.page-title-sub {
  display: block;
  font-size: 1.6rem;
  font-weight: 700;
}
.page-title-main {
  display: block;
  font-size: 2.4rem;
  font-weight: 700;
}
@include g.mxMediaQuery(g.$bp-sm) {
  .page-title-box {
    padding: 40px 0;
  }
  .page-title-sub {
    font-size: 3.2rem;
  }
  .page-title-main {
    font-size: 4rem;
  }
}
</style>
