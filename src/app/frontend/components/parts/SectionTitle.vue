<template>
  <div class="l-section-title">
    <div class="l-inner">
      <div class="section-title-box">
        <span v-if="subTitle" class="section-title-sub">{{ subTitle }}</span>
        <h2 class="section-title-main">{{ title }}</h2>
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
$color-section_title_box-background: g.$palette-east_bay;

$color-section_title_sub-text: g.$palette-east_bay;

.section-title-box {
  position: relative;
  padding-top: 32px;
  &:before {
    content: '';
    display: block;
    width: 8px;
    height: 8px;
    border-radius: 8px;
    background-color: $color-section_title_box-background;
    position: absolute;
    top: 24px;
    left: 50%;
    margin-left: -4px;
  }
  &:after {
    content: '';
    display: block;
    width: 1px;
    background-color: $color-section_title_box-background;
    position: absolute;
    top: 0;
    left: 50%;
    animation: keyframes-section-title-box-border-xs 2s infinite;
  }
}
@keyframes keyframes-section-title-box-border-xs {
  0% {
    height: 0;
  }
  100% {
    height: 24px;
  }
}
@keyframes keyframes-section-title-box-border-sm {
  0% {
    height: 0;
  }
  100% {
    height: 40px;
  }
}
.section-title-sub {
  display: block;
  font-size: 1.6rem;
  font-weight: 700;
  text-align: center;
  color: $color-section_title_sub-text;
  margin-top: 12px;
  + .section-title-main {
    margin-top: 0;
  }
}
.section-title-main {
  display: block;
  font-size: 2.4rem;
  font-weight: 700;
  text-align: center;
  margin-top: 12px;
}
@include g.mxMediaQuery(g.$bp-sm) {
  .section-title-box {
    padding-top: 48px;
    &:before {
      top: 40px;
    }
    &:after {
      animation: keyframes-section-title-box-border-sm 2s infinite;
    }
  }
  .section-title-sub {
    font-size: 2rem;
    margin-top: 8px;
  }
  .section-title-main {
    font-size: 3.2rem;
    margin-top: 8px;
  }
}
@include g.mxMediaQuery(g.$bp-md) {
  .section-title-sub {
    font-size: 2.4rem;
  }
  .section-title-main {
    font-size: 4rem;
  }
}
</style>
