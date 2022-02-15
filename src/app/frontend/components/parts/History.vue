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
                    v-if="content.from && content.from > 0"
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
                    v-if="content.to && content.to > 0"
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
              <div
                v-if="flgShowDescription(content)"
                class="history-contents-description-box"
              >
                <div
                  v-if="content.positions.data.length > 0"
                  class="history-contents-description-items"
                >
                  <span
                    v-for="position in content.positions.data"
                    class="history-contents-description-item"
                  >
                    {{ position.attributes.name }}
                  </span>
                </div>
                <div
                  v-if="
                    content.programs.data.length > 0 ||
                    content.cmses.data.length > 0 ||
                    content.designs.data.length > 0 ||
                    content.others.data.length > 0
                  "
                  class="history-contents-description-items"
                >
                  <span
                    v-for="program in content.programs.data"
                    class="history-contents-description-item"
                  >
                    {{ program.attributes.name }}
                  </span>
                  <span
                    v-for="cms in content.cmses.data"
                    class="history-contents-description-item"
                  >
                    {{ cms.attributes.name }}
                  </span>
                  <span
                    v-for="design in content.designs.data"
                    class="history-contents-description-item"
                  >
                    {{ design.attributes.name }}
                  </span>
                  <span
                    v-for="other in content.others.data"
                    class="history-contents-description-item"
                  >
                    {{ other.attributes.name }}
                  </span>
                </div>
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

const flgShowDescription = computed(() => {
  return (val: historyContent) => {
    let result: boolean = false;

    if (
      val.positions.data.length > 0 ||
      val.programs.data.length > 0 ||
      val.cmses.data.length > 0 ||
      val.designs.data.length > 0 ||
      val.others.data.length > 0
    ) {
      result = true;
    }

    return result;
  };
});
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
.history-contents-description-items {
  display: flex;
  flex-wrap: wrap;
  > .history-contents-description-item {
    &:last-of-type {
      &:after {
        content: none;
      }
    }
  }
}
.history-contents-description-item {
  &:after {
    content: '、';
  }
}
@include g.mxMediaQuery(g.$bp-sm) {
  .history-items {
    > .history-item {
      &:first-of-type {
        .history-contents-items {
          > .history-contents-item {
            &:first-of-type {
              &:after {
                height: calc(100% - 16px);
                top: 16px;
              }
            }
          }
        }
      }
      .history-contents-items {
        > .history-contents-item {
          &:first-of-type {
            &:after {
              height: calc(100% + 36px);
              top: -36px;
            }
          }
        }
      }
    }
  }
  .history-item {
    margin-top: 36px;
  }
  .history-title {
    font-size: 2.4rem;
    top: 80px;
  }
  .history-contents {
    padding-left: 56px;
  }
  .history-contents-items {
    > .history-contents-item {
      &:first-of-type {
        &:after {
          height: calc(100% - 16px);
          top: 16px;
        }
        &:before {
          top: 14px;
        }
        .history-contents-date {
          padding-top: 4px;
        }
      }
    }
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
@include g.mxMediaQuery(g.$bp-md) {
  .history-items {
    > .history-item {
      &:first-of-type {
        .history-contents-items {
          > .history-contents-item {
            &:first-of-type {
              &:after {
                height: calc(100% - 24px);
                top: 24px;
              }
            }
          }
        }
      }
      .history-contents-items {
        > .history-contents-item {
          &:first-of-type {
            &:after {
              height: calc(100% + 28px);
              top: -28px;
            }
          }
        }
      }
    }
  }
  .history-item {
    margin-top: 28px;
  }
  .history-title {
    font-size: 3.2rem;
  }
  .history-contents-items {
    > .history-contents-item {
      &:first-of-type {
        &:after {
          height: calc(100% - 24px);
          top: 24px;
        }
        &:before {
          top: 22px;
        }
        .history-contents-date {
          padding-top: 12px;
        }
      }
    }
  }
}
</style>
