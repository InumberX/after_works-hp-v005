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
  flgInit?: boolean;
};
const { adSenseInfos, flgSide, flgInit } = defineProps<Props>();

onMounted(() => {
  if (flgInit) {
    const win: any = window;
    // 広告リストを初期化
    if (!win.adsbygoogle) {
      win.adsbygoogle = [];
    }

    // 広告用のJSを追加
    const adsScript = document.createElement('script');
    adsScript.src =
      'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
    adsScript.id = 'ads-script';
    adsScript.setAttribute('data-ad-client', 'ca-pub-6711167987812480');
    adsScript.async = true;
    document.body.appendChild(adsScript);
  }
});

onUnmounted(() => {
  if (flgInit) {
    const win: any = window;
    // 広告リストを初期化
    if (!win.adsbygoogle) {
      win.adsbygoogle = [];
    }

    // 広告用のJSを削除
    const adsScript = document.getElementById('ads-script');
    if (typeof adsScript !== 'undefined' && adsScript !== null) {
      adsScript.remove();
    }
  }
});
</script>

<style lang="scss" scoped>
@use '~/assets/_scss/_global/index' as g;

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
@include g.mxMediaQuery(g.$bp-sm) {
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
@include g.mxMediaQuery(g.$bp-md) {
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
