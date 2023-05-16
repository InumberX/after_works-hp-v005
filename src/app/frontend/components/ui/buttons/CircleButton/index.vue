<template>
  <a
    v-if="isExternal"
    :href="url"
    :target="target"
    :rel="rel"
    class="CircleButton"
    :class="[
      `CircleButton--${rotate}`,
      elmType ? 'CircleButton--' + elmType : '',
      isDisabled ? 'CircleButton--disabled' : '',
    ]"
    :title="title"
    :aria-label="title"
  >
    <IconArrowTop v-if="rotate === 'top'" class="CircleButton__icon CircleButton__icon--top" />
    <IconArrowBootom v-else-if="rotate === 'bottom'" class="CircleButton__icon CircleButton__icon--bottom" />
    <IconArrowLeft v-else-if="rotate === 'left'" class="CircleButton__icon CircleButton__icon--left" />
    <IconArrowRight v-else class="CircleButton__icon CircleButton__icon--right" />
  </a>
  <NuxtLink
    v-else-if="url"
    :to="url"
    class="CircleButton"
    :class="[
      `CircleButton--${rotate}`,
      elmType ? 'CircleButton--' + elmType : '',
      isDisabled ? 'CircleButton--disabled' : '',
    ]"
    :title="title"
    :aria-label="title"
  >
    <IconArrowTop v-if="rotate === 'top'" class="CircleButton__icon CircleButton__icon--top" />
    <IconArrowBootom v-else-if="rotate === 'bottom'" class="CircleButton__icon CircleButton__icon--bottom" />
    <IconArrowLeft v-else-if="rotate === 'left'" class="CircleButton__icon CircleButton__icon--left" />
    <IconArrowRight v-else class="CircleButton__icon CircleButton__icon--right" />
  </NuxtLink>
  <button
    v-else
    :type="buttonType"
    class="CircleButton"
    :class="[
      `CircleButton--${rotate}`,
      elmType ? 'CircleButton--' + elmType : '',
      isDisabled ? 'CircleButton--disabled' : '',
    ]"
    :title="title"
    :aria-label="title"
    @click="emits('click')"
    :disabled="isDisabled"
  >
    <IconArrowTop v-if="rotate === 'top'" class="CircleButton__icon CircleButton__icon--top" />
    <IconArrowBootom v-else-if="rotate === 'bottom'" class="CircleButton__icon CircleButton__icon--bottom" />
    <IconArrowLeft v-else-if="rotate === 'left'" class="CircleButton__icon CircleButton__icon--left" />
    <IconArrowRight v-else class="CircleButton__icon CircleButton__icon--right" />
  </button>
</template>

<script setup lang="ts">
import { ButtonType, AnchorTarget, AnchorRel } from '~/types/html'
import IconArrowTop from '~/components/ui/icons/IconArrowTop/index.vue'
import IconArrowRight from '~/components/ui/icons/IconArrowRight/index.vue'
import IconArrowBootom from '~/components/ui/icons/IconArrowBottom/index.vue'
import IconArrowLeft from '~/components/ui/icons/IconArrowLeft/index.vue'

type Props = {
  url?: string
  title?: string
  target?: AnchorTarget
  rel?: AnchorRel
  buttonType?: ButtonType
  // ボタンの向き
  rotate?: 'top' | 'left' | 'bottom' | 'right'
  elmType?: 'small'
  isDisabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  buttonType: 'button',
  rotate: 'right',
})

const { url, title, target, rel, buttonType, rotate } = props

const isDisabled = computed(() => props.isDisabled)

const emits = defineEmits(['click'])
const isExternal = url ? url.startsWith('http://') || url.startsWith('https://') : false
</script>

<style lang="scss" scoped>
@use '~/assets/_scss/_global/index' as *;

.CircleButton {
  &:not(:root) {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 64px;
    border: none;
    padding: 0;
    transition: 0.3s box-shadow;
    background: linear-gradient(90deg, $gradation-primary);

    @include mxMediaQuerySm {
      width: 56px;
      height: 56px;
    }

    @include mxMediaQueryMd {
      width: 64px;
      height: 64px;
    }

    @include mxMediaHover() {
      &:hover {
        box-shadow: 0px 0px 12px rgba($palette-sky-blue, 0.64), 0px 0px 12px rgba($palette-sky-blue, 0.64);
      }
    }
  }
}

.CircleButton--top {
  &:not(:root) {
    background: linear-gradient(0deg, $gradation-primary);
  }
}

.CircleButton--bottom {
  &:not(:root) {
    background: linear-gradient(180deg, $gradation-primary);
  }
}

.CircleButton--left {
  &:not(:root) {
    background: linear-gradient(270deg, $gradation-primary);
  }
}

.CircleButton--disabled {
  &:not(:root) {
    cursor: not-allowed;
    pointer-events: none;

    .CircleButton__icon {
      fill: $palette-silver-chalice;
    }
  }
}

.CircleButton--small {
  &:not(:root) {
    width: 40px;
    height: 40px;

    .CircleButton__icon {
      width: 12px;
    }
  }
}

.CircleButton__icon {
  fill: $palette-white;
}

.CircleButton__icon--top,
.CircleButton__icon--bottom {
  width: 18px;
  height: auto;

  @include mxMediaQuerySm {
    width: 20px;
  }

  @include mxMediaQueryMd {
    width: 22px;
  }
}

.CircleButton__icon--left,
.CircleButton__icon--right {
  width: 10px;
  height: auto;

  @include mxMediaQuerySm {
    width: 11px;
  }

  @include mxMediaQueryMd {
    width: 12px;
  }
}
</style>
