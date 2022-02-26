<template>
  <div class="adsbygoogle-box">
    <ins
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

type Props = {
  adSenseInfo: adSenseInfo;
};
const { adSenseInfo } = defineProps<Props>();

onMounted(() => {
  nextTick(() => {
    try {
      setTimeout(() => {
        // @ts-ignore
        (adsbygoogle = window.adsbygoogle || []).push({});
      }, 100);
    } catch (error) {
      console.log(error);
    }
  });
});

onUnmounted(() => {
  try {
    // @ts-ignore
    adsbygoogle = [];
  } catch (error) {}
});
</script>
