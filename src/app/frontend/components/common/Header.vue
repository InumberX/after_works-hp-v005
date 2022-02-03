<template>
  <header class="l-header">
    <div class="l-inner header-inner">
      <div class="header-box">
        <div class="header-logo-box">
          <h1 class="header-logo">
            <NuxtLink to="/" class="header-logo-link">
              <img
                :src="`${config.baseDir}assets/img/img-logo.svg?${config.cashBuster}`"
                :alt="$const.meta.title"
                class="header-logo-img"
                width="160"
                height="26"
              />
            </NuxtLink>
          </h1>
        </div>
        <!-- /.header-logo-box -->
      </div>
      <!-- /.header-box -->
    </div>
    <!-- /.l-inner -->
  </header>
</template>

<script setup lang="ts">
const { $const } = useNuxtApp();
const config = useRuntimeConfig();
</script>

<style lang="scss" scoped>
@use '~/assets/_scss/_global/index' as g;

// 変数
$color-l_header-background: g.$palette-white;
$color-l_header-border: g.$palette-gallery;

.l-header {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: g.$z_index-header_1;
  border-bottom: 1px solid $color-l_header-border;
  background-color: $color-l_header-background;
}
.header-box {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.header-logo-link:not(:root) {
  display: block;
  &:hover {
    opacity: g.$opacity-main;
  }
}
.header-logo-img {
  width: 160px;
  height: 26px;
}
</style>
