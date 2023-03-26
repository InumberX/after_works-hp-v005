<template>
  <div class="l-section">
    <div class="l-message">
      <div class="l-inner">
        <div class="message-box">
          <p class="message-text">
            Webデザイナー、フロントエンドエンジニアとしての経験を活かし、
            <br class="lg-obj xl-obj" />
            デザインからコーディングまで一貫して対応します。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@use '~/assets/_scss/_global/index' as g;

.message-text {
  text-align: center;
  font-size: 1.8rem;
}
@include g.mxMediaQuery(g.$bp-sm) {
  .message-text {
    font-size: 2.2rem;
  }
}
@include g.mxMediaQuery(g.$bp-lg) {
  .message-text {
    font-size: 2.4rem;
  }
}
</style>
