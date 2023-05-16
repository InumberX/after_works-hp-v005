<template>
  <div class="LayoutSvgPainter">
    <svg width="0" height="0">
      <linearGradient id="svg-painter-gradient-primary-top" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop class="stop" offset="0%" />
        <stop class="stop" offset="100%" />
      </linearGradient>

      <linearGradient id="svg-painter-gradient-primary-right" x1="0%" y1="50%" x2="100%" y2="50%">
        <stop class="stop" offset="0%" />
        <stop class="stop" offset="100%" />
      </linearGradient>

      <linearGradient id="svg-painter-gradient-primary-bottom" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop class="stop" offset="0%" />
        <stop class="stop" offset="100%" />
      </linearGradient>

      <linearGradient id="svg-painter-gradient-primary-left" x1="0%" y1="50%" x2="100%" y2="50%">
        <stop class="stop" offset="0%" />
        <stop class="stop" offset="100%" />
      </linearGradient>
    </svg>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@use '~/assets/_scss/_global/index' as *;

.LayoutSvgPainter {
  visibility: hidden;
  width: 0;
  height: 0;
}

#svg-painter-gradient-primary-top {
  .stop {
    &:nth-child(1) {
      stop-color: $palette-sky-blue;
    }

    &:nth-child(2) {
      stop-color: $palette-heliotrope;
    }
  }
}

#svg-painter-gradient-primary-right {
  .stop {
    &:nth-child(1) {
      stop-color: $palette-heliotrope;
    }

    &:nth-child(2) {
      stop-color: $palette-sky-blue;
    }
  }
}

#svg-painter-gradient-primary-bottom {
  .stop {
    &:nth-child(1) {
      stop-color: $palette-heliotrope;
    }

    &:nth-child(2) {
      stop-color: $palette-sky-blue;
    }
  }
}

#svg-painter-gradient-primary-left {
  .stop {
    &:nth-child(1) {
      stop-color: $palette-sky-blue;
    }

    &:nth-child(2) {
      stop-color: $palette-heliotrope;
    }
  }
}
</style>
