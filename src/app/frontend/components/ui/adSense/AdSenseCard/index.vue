<template>
  <div class="AdSenseCard"></div>
</template>

<script setup lang="ts">
import { AdSenseInfo } from '~/types/adSense'

type Props = {
  adSenseCardInfo: AdSenseInfo
}

const { adSenseCardInfo } = defineProps<Props>()
</script>

<style lang="scss" scoped>
@use '~/assets/_scss/_global/index' as *;
</style>
