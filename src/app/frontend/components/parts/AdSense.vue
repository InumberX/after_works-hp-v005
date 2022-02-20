<template>
  <ins
    class="adsbygoogle"
    :data-ad-slot="adSenseInfo.slot"
    :data-full-width-responsive="adSenseInfo.responsive"
    :data-ad-title="`ads-${adSenseInfo.slot}`"
    :title="`ads-${adSenseInfo.slot}`"
    :style="adSenseInfo.style"
  />
</template>

<script setup lang="ts">
type Props = {
  adSenseInfo: adSenseInfo;
};
const { adSenseInfo } = defineProps<Props>();

onMounted(() => {
  nextTick(() => {
    try {
      const win: any = window;
      (win.adsbygoogle = win.adsbygoogle || []).push({});
    } catch (e) {}
  });
});
</script>
