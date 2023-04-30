<template>
  <div class="l-card-list">
    <div class="l-inner">
      <div class="card-list-box">
        <ul class="card-list-items">
          <li
            v-for="cardListInfo in cardListInfos"
            :key="cardListInfo.title"
            class="card-list-item"
          >
            <div class="card-list-contents">
              <div v-if="cardListInfo.iconClassName" class="card-list-img-box">
                <CommonIcon :class-name="cardListInfo.iconClassName" />
              </div>
              <div class="card-list-title-box">
                <h3 class="card-list-title">{{ cardListInfo.title }}</h3>
              </div>
              <div class="card-list-text-box">
                <p v-for="text in cardListInfo.texts" class="card-list-text">
                  {{ text }}
                </p>
              </div>
              <div
                v-if="cardListInfo.url && cardListInfo.linkText"
                class="card-list-link-box"
              >
                <NuxtLink
                  :to="cardListInfo.url"
                  class="primary-btn card-list-link"
                >
                  <span class="primary-btn-text">
                    {{ cardListInfo.linkText }}
                  </span>
                </NuxtLink>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Props = {
  cardListInfos: {
    title: string;
    iconClassName?: string;
    texts: string[];
    url?: string;
    linkText?: string;
  }[];
};
const { cardListInfos } = defineProps<Props>();
</script>

<style lang="scss" scoped>
@use '~/assets/_scss/_global/index' as *;

// 変数
$color-card_list_contents-background: $palette-white;
$color-card_list_contents-border: $palette-gallery;

$color-card_list_img_box-background: $palette-gallery;

.card-list-box {
  margin-top: 24px;
}
.card-list-items {
  > .card-list-item {
    &:first-of-type {
      margin-top: 0;
    }
  }
}
.card-list-item {
  margin-top: 16px;
}
.card-list-contents {
  background-color: $color-card_list_contents-background;
  border: 4px solid $color-card_list_contents-border;
  padding: 24px;
}
.card-list-img-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 120px;
  overflow: hidden;
  background-color: $color-card_list_img_box-background;
  margin: 0 auto;
  .icon {
    width: 56px;
    height: 56px;
  }
  + .card-list-title-box {
    margin-top: 16px;
  }
}
.card-list-title {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
}
.card-list-text-box {
  margin-top: 8px;
}
.card-list-link-box {
  margin-top: 24px;
  display: flex;
  justify-content: center;
}
@include mxMediaQuery($bp-sm) {
  .card-list-contents {
    padding: 40px;
  }
  .card-list-img-box {
    width: 120px;
    height: 120px;
    .icon {
      width: 80px;
      height: 80px;
    }
    + .card-list-title-box {
      margin-top: 24px;
    }
  }
  .card-list-title {
    font-size: 2.8rem;
  }
  .card-list-text-box {
    margin-top: 16px;
  }
}
@include mxMediaQuery($bp-md) {
  .card-list-items {
    display: flex;
    flex-wrap: wrap;
    > .card-list-item {
      @include mxListWidth(2, 16px) {
      }
    }
  }
  .card-list-contents {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .card-list-title {
    font-size: 3.2rem;
  }
  .card-list-link-box {
    margin-top: auto;
  }
  .card-list-link:not(:root) {
    margin-top: 24px;
  }
}
</style>
