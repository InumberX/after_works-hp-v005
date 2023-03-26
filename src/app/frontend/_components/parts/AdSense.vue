<template>
  <div :key="`${adSenseInfo.slot}-${Math.random()}`" class="adsbygoogle-box">
    <ins
      ref="adsenseElm"
      class="adsbygoogle"
      :key="`${route.path}${adSenseInfo.slot}`"
      :data-ad-client="$const.adsId"
      :data-ad-slot="adSenseInfo.slot"
      :data-full-width-responsive="adSenseInfo.responsive"
      :style="adSenseInfo.style"
    ></ins>
  </div>
</template>

<script setup lang="ts">
const { $const } = useNuxtApp();
const route = useRoute();
const utils = useUtils();

type Props = {
  adSenseInfo: adSenseInfo;
};
const { adSenseInfo } = defineProps<Props>();
const isShow = ref<boolean>(false);
const adsenseElm = ref<Element | null>(null);

const showAd = () => {
  isShow.value = true;

  setTimeout(() => {
    if (adsenseElm.value !== null && adsenseElm.value.innerHTML) {
      return;
    }

    try {
      // @ts-ignore
      adsbygoogle = window.adsbygoogle || [];
      // @ts-ignore
      adsbygoogle.push({});
      // @ts-ignore
      console.log(adsbygoogle.length);
    } catch (error) {
      console.log(error);
    }
  }, 100);
};

onMounted(() => {
  nextTick(() => {
    if (utils.vars.value.isAdsenseLoaded && !isShow.value) {
      showAd();
    }
  });
});

const isAdsenseLoaded = computed(() => {
  return utils.vars.value.isAdsenseLoaded;
});

watch(isAdsenseLoaded, () => {
  if (utils.vars.value.isAdsenseLoaded && !isShow.value) {
    showAd();
  }
});

onUnmounted(() => {
  if (adsenseElm.value !== null) {
    adsenseElm.value.innerHTML = '';
  }
});
</script>
