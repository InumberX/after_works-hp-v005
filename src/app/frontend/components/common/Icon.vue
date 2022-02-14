<template>
  <i class="icon" :class="className"></i>
</template>

<script setup lang="ts">
type Props = {
  className: string;
};
const { className } = defineProps<Props>();
</script>

<style lang="scss" scoped>
@use '~/assets/_scss/_global/index' as g;

.icon {
  display: inline-block;
  width: 24px;
  height: 24px;
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
}
.icon-home {
  background-image: url('~/assets/img/icon-home.svg');
}
.icon-article {
  background-image: url('~/assets/img/icon-article.svg');
}
.icon-person {
  background-image: url('~/assets/img/icon-person.svg');
}
.icon-star {
  background-image: url('~/assets/img/icon-star.svg');
}
.icon-mail {
  background-image: url('~/assets/img/icon-mail.svg');
}
.icon-palette {
  background-image: url('~/assets/img/icon-palette.svg');
}
.icon-laptop {
  background-image: url('~/assets/img/icon-laptop.svg');
}
.icon-twitter {
  background-image: url('~/assets/img/icon-twitter.svg');
  width: 32px;
  height: 26px;
}
.icon-instagram {
  background-image: url('~/assets/img/icon-instagram.svg');
  width: 26px;
  height: 26px;
}
.icon-github {
  background-image: url('~/assets/img/icon-github.svg');
  width: 26px;
  height: 26px;
}
.icon-youtube {
  background-image: url('~/assets/img/icon-youtube.svg');
  width: 37px;
  height: 26px;
}
.icon-qiita {
  background-image: url('~/assets/img/icon-qiita.svg');
  width: 24px;
  height: 26px;
}
.icon-note {
  background-image: url('~/assets/img/icon-note.svg');
  width: 23px;
  height: 26px;
}
.icon-behance {
  background-image: url('~/assets/img/icon-behance.svg');
  width: 41px;
  height: 26px;
}
.icon-pixiv {
  background-image: url('~/assets/img/icon-pixiv.svg');
  width: 28px;
  height: 26px;
}
.icon-facebook {
  background-image: url('~/assets/img/icon-facebook.svg');
  width: 14px;
  height: 28px;
}
.icon-line {
  background-image: url('~/assets/img/icon-line.svg');
  width: 21px;
  height: 20px;
}
</style>
