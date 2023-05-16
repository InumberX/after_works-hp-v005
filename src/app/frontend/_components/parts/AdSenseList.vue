<template>
  <div class="ads-box" :class="[{ 'is-side': flgSide }]">
    <ul class="ads-items">
      <li
        v-for="adSenseInfo in adSenseInfos"
        class="ads-item"
        :key="adSenseInfo.slot"
      >
        <PartsAdSense :ad-sense-info="adSenseInfo" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
type Props = {
  adSenseInfos: adSenseInfo[];
  flgSide?: boolean;
};
const { adSenseInfos, flgSide } = defineProps<Props>();
</script>

<style lang="scss" scoped>
@use '~/assets/_scss/_global/index' as *;

.ads-box {
  overflow: hidden;
  margin-top: 48px;
  &.is-side {
    margin-top: 0;
    .ads-items {
      margin: -8px;
    }
    .ads-item {
      padding: 8px;
    }
  }
}
.ads-items {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin: -12px;
}
.ads-item {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 12px;
  box-sizing: content-box;
  width: 300px;
  max-width: 300px;
  height: 300px;
  max-height: 300px;
}
@include mxMediaQuery($bp-sm) {
  .ads-box {
    margin-top: 80px;
  }
  .ads-items {
    margin: -20px;
  }
  .ads-item {
    padding: 20px;
  }
}
@include mxMediaQuery($bp-md) {
  .ads-box {
    &.is-side {
      .ads-items {
        margin: 0;
        .ads-item {
          &:first-of-type {
            margin-top: 0;
          }
        }
      }
      .ads-item {
        padding: 0;
        margin-top: 16px;
      }
    }
  }
}
</style>
