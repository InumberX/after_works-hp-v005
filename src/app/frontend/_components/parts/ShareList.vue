<template>
  <div class="share-list-box">
    <ul class="share-list-items">
      <li
        v-for="shareInfo in shareInfos"
        :key="shareInfo.url"
        class="share-list-item"
      >
        <a
          :href="shareInfo.url"
          class="share-list-link"
          :class="[shareInfo.className]"
          :title="shareInfo.title"
          :aria-label="shareInfo.title"
          target="_blank"
          rel="noopener"
        >
          <CommonIcon :class-name="shareInfo.iconClassName" />
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const utils = useUtils();

type Props = {
  shareUrl: string;
};

const { shareUrl } = defineProps<Props>();

interface shareInfos {
  url: string;
  title: string;
  className: string;
  iconClassName: string;
}

const url: string = utils.encode(shareUrl);

const shareInfos = <shareInfos[]>[
  {
    url: 'https://twitter.com/share?url=' + url,
    title: 'Twitterでシェアする',
    className: 'is-twitter',
    iconClassName: 'icon-twitter',
  },
  {
    url: 'https://www.facebook.com/sharer/sharer.php?u=' + url,
    title: 'Facebookでシェアする',
    className: 'is-facebook',
    iconClassName: 'icon-facebook',
  },
  {
    url: 'https://line.me/R/msg/text/?' + url,
    title: 'LINEでシェアする',
    className: 'is-line',
    iconClassName: 'icon-line',
  },
];
</script>

<style lang="scss" scoped>
@use '~/assets/_scss/_global/index' as *;

// 変数

.share-list-items {
  display: flex;
  flex-wrap: wrap;
  margin: -8px -16px -8px 0;
}
.share-list-item {
  margin: 8px 16px 8px 0;
}
.share-list-link:not(:root) {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 32px;
  overflow: hidden;
  &.is-twitter {
    background-color: $color-sns-twitter;
  }
  &.is-facebook {
    background-color: $color-sns-facebook;
    align-items: flex-end;
  }
  &.is-line {
    background-color: $color-sns-line;
  }
  @media (hover: hover) {
    &:hover {
      opacity: $opacity-main;
    }
  }
  .icon-twitter {
    width: 21px;
    height: 17px;
  }
  .icon-facebook {
    margin-bottom: -2px;
  }
}
</style>
