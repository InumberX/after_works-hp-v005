<template>
  <div class="l-main-visual">
    <div class="l-inner">
      <div class="main-visual-box">
        <figure class="main-visual-img-box">
          <img
            :src="`${config.baseDir}${$const.url.img}img-main_visual.jpg?${config.cashBuster}`"
            alt=""
            class="main-visual-img"
          />
        </figure>
        <div class="main-visual-title-box">
          <h1 class="main-visual-title">
            <span class="main-visual-title-text">From design</span>
            <span class="main-visual-title-text">to coding</span>
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { $const } = useNuxtApp();
const config = useRuntimeConfig();
</script>

<style lang="scss" scoped>
@use '~/assets/_scss/_global/index' as *;

// 変数
$color-main_visual_title_box-background: $palette-seashell;

.l-main-visual {
  position: relative;
  padding-bottom: 80px;
}
.main-visual-img-box {
  position: relative;
  z-index: $z_index-2;
  width: 90%;
  max-width: 560px;
  margin-left: auto;
}
.main-visual-img {
  width: 100%;
}
.main-visual-title-box {
  margin-top: 40px;
  &:after {
    content: '';
    width: 240px;
    height: 60%;
    display: block;
    position: absolute;
    z-index: $z_index-1;
    bottom: 40px;
    left: 0;
    background-color: $color-main_visual_title_box-background;
  }
}
.main-visual-title {
  position: relative;
  z-index: $z_index-3;
  font-size: 4rem;
  font-weight: 700;
}
.main-visual-title-text {
  display: block;
}
@include mxMediaQuery($bp-sm) {
  .l-main-visual {
    padding-bottom: 80px;
  }
  .main-visual-title-box {
    &:after {
      width: 320px;
      bottom: 0;
    }
  }
  .main-visual-title {
    font-size: 5.6rem;
  }
}
@include mxMediaQuery($bp-md) {
  .l-main-visual {
    padding-bottom: 0;
  }
  .main-visual-box {
    display: flex;
    align-items: flex-end;
    flex-direction: row-reverse;
    position: relative;
    padding: 16px 0 80px;
  }
  .main-visual-img-box {
    width: 100%;
    max-width: none;
    margin: 0;
    padding-left: 40px;
  }
  .main-visual-title-box {
    flex-shrink: 0;
    margin: 0;
    &:after {
      width: 240px;
      height: 90%;
      left: 40px;
    }
  }
}
@include mxMediaQuery($bp-lg) {
  .main-visual-title-box {
    &:after {
      height: 80%;
      left: 80px;
    }
  }
  .main-visual-title {
    font-size: 6.4rem;
  }
}
</style>
