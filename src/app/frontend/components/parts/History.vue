<template>
  <div class="history-box">
    <ul class="history-items">
      <li v-for="history in histories" :key="history.year" class="history-item">
        <div class="history-title-box">
          <h2 class="history-title">
            <time class="history-title-text" :datetime="history.year">
              {{ history.year }}
            </time>
          </h2>
        </div>
        <div class="history-contents">
          <ul class="history-contents-items">
            <li
              v-for="content in history.content"
              :key="content.title"
              class="history-contents-item"
            >
              <div class="history-contents-date">
                <template v-if="content.from === content.to">
                  <time
                    class="history-contents-date-text"
                    :datetime="`${history.year}-${utils.zeroPadding(
                      content.from,
                      2
                    )}`"
                  >
                    {{ content.from }}月
                  </time>
                </template>
                <template v-else>
                  <time
                    v-if="content.from"
                    class="history-contents-date-text"
                    :datetime="`${history.year}-${utils.zeroPadding(
                      content.from,
                      2
                    )}`"
                  >
                    {{ content.from }}月
                  </time>
                  〜
                  <time
                    v-if="content.to"
                    class="history-contents-date-text"
                    :datetime="`${history.year}-${utils.zeroPadding(
                      content.to,
                      2
                    )}`"
                  >
                    {{ content.to }}月
                  </time>
                </template>
              </div>
              <div class="history-contents-title-box">
                <h3 class="history-contents-title">
                  {{ content.title }}
                </h3>
              </div>
              <div v-if="content.text" class="history-contents-description-box">
                <p
                  class="history-contents-description"
                  v-html="utils.replaceNewLine(utils.escape(content.text))"
                ></p>
              </div>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const utils = useUtils();

type Props = {
  histories: history[];
};

const { histories } = defineProps<Props>();
</script>

<style lang="scss" scoped>
@use '~/assets/_scss/_global/index' as g;

// 変数
$color-history_contents_item-background: g.$palette-resolution_blue;

$color-history_contents_description_box-text: g.$palette-boulder;

.history-box {
  max-width: 960px;
  margin: 0 auto;
}
.history-items {
  > .history-item {
    &:first-of-type {
      margin-top: 0;
      .history-contents-items {
        > .history-contents-item {
          &:first-of-type {
            &:after {
              height: calc(100% - 12px);
              top: 12px;
            }
          }
        }
      }
    }
  }
}
.history-item {
  display: flex;
  margin-top: 24px;
}
.history-title-box {
  flex-shrink: 0;
}
.history-title {
  font-size: 2rem;
  font-weight: 700;
  position: sticky;
  top: 16px;
}
.history-contents {
  padding-left: 40px;
}
.history-contents-items {
  > .history-contents-item {
    &:first-of-type {
      margin-top: 0;
    }
  }
}
.history-contents-item {
  position: relative;
  margin-top: 24px;
  &:before,
  &:after {
    content: '';
    background-color: $color-history_contents_item-background;
    display: block;
    position: absolute;
  }
  &:before {
    width: 8px;
    height: 8px;
    border-radius: 8px;
    top: 10px;
    left: -23px;
  }
  &:after {
    width: 2px;
    height: calc(100% + 24px);
    top: -24px;
    left: -20px;
  }
}
.history-contents-date {
  display: flex;
  align-items: center;
  font-size: 1.8rem;
  font-weight: 700;
}
.history-contents-title-box {
  margin-top: 8px;
}
.history-contents-title {
  font-size: 1.6rem;
  font-weight: 400;
}
.history-contents-description-box {
  margin-top: 8px;
  padding-left: 24px;
  color: $color-history_contents_description_box-text;
}
@include g.mxMediaQuery(g.$bp-sm) {
  .history-items {
    > .history-item {
      .history-contents-items {
        > .history-contents-item {
          &:first-of-type {
            &:after {
              height: calc(100% + 40px);
              top: -40px;
            }
          }
        }
      }
    }
  }
  .history-item {
    margin-top: 40px;
  }
  .history-title {
    font-size: 2.4rem;
    top: 80px;
  }
  .history-contents {
    padding-left: 56px;
  }
  .history-contents-item {
    &:before {
      left: -31px;
    }
    &:after {
      left: -28px;
    }
  }
}
</style>
