<template>
  <div class="lead-box">
    <p
      v-for="lead in leads"
      :key="lead.text"
      class="lead-text"
      v-html="utils.replaceNewLine(utils.escape(lead.text))"
    ></p>
  </div>
</template>

<script setup lang="ts">
const utils = useUtils();

type Props = {
  leads: lead[];
};

const { leads } = defineProps<Props>();
</script>

<style lang="scss" scoped>
@use '~/assets/_scss/_global/index' as *;

.lead-text {
  + .lead-text {
    margin-top: 16px;
  }
}
@include mxMediaQuery($bp-sm) {
  .lead-text {
    + .lead-text {
      margin-top: 24px;
    }
  }
}
</style>
