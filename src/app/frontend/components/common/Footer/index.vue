<template>
  <footer class="LayoutFooter">
    <div class="FooterBackToTop">
      <div class="FooterBackToTop__container">
        <CircleButton
          title="ページトップに戻る"
          class="FooterBackToTop__button"
          @click="utils.actSmoothScroll('#')"
          rotate="top"
        />
      </div>
    </div>

    <div class="Footer">
      <div class="Footer__contents">
        <Inner>
          <div class="FooterContents">
            <div class="FooterNavigation">
              <nav class="FooterNavigation__container">
                <ul class="FooterNavigation__items">
                  <li v-for="info in footerMenuInfos" :key="info.id" class="FooterNavigation__item">
                    <button
                      v-if="info.elmId"
                      type="button"
                      class="FooterNavigation__link"
                      @click="
                        movePage({
                          url: info.url,
                          id: info.elmId,
                        })
                      "
                    >
                      <IconArrowRight class="FooterNavigation__icon" />
                      <span class="FooterNavigation__text">
                        {{ info.menuText }}
                      </span>
                    </button>
                    <NuxtLink v-else :to="info.url" class="FooterNavigation__link">
                      <IconArrowRight class="FooterNavigation__icon" />
                      <span class="FooterNavigation__text">
                        {{ info.menuText }}
                      </span>
                    </NuxtLink>
                  </li>
                </ul>
              </nav>
            </div>

            <div class="FooterSns">
              <ul class="FooterSns__items">
                <li v-for="info in footerSnsInfos" :key="info.id" class="FooterSns__item">
                  <a
                    :href="info.url"
                    class="FooterSns__link"
                    :class="[`FooterSns__link--${info.id}`]"
                    target="_blank"
                    rel="noopener noreferrer"
                    :title="info.title"
                    :aria-label="info.title"
                  >
                    <Component :is="info.icon" class="FooterSns__icon" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Inner>
      </div>

      <div class="Footer__copy">
        <Inner>
          <div class="FooterCopy">
            <p class="FooterCopy__paragraph">
              <small class="FooterCopy__text" lang="en" translate="no">
                Copyright &copy; {{ currentYear }} N/NE, All rights reserved.
              </small>
            </p>
          </div>
        </Inner>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { DefineComponent } from 'nuxt/dist/app/compat/capi'
import Inner from '~/components/layout/Inner/index.vue'
import { routes } from '~/config/routes'
import CircleButton from '~/components/ui/buttons/CircleButton/index.vue'
import IconArrowRight from '~/components/ui/icons/IconArrowRight/index.vue'
import IconTwitter from '~/components/ui/icons/IconTwitter/index.vue'
import IconInstagram from '~/components/ui/icons/IconInstagram/index.vue'
import IconGitHub from '~/components/ui/icons/IconGitHub/index.vue'
import IconYouTube from '~/components/ui/icons/IconYouTube/index.vue'
import IconQiita from '~/components/ui/icons/IconQiita/index.vue'
import IconNote from '~/components/ui/icons/IconNote/index.vue'
import IconBehance from '~/components/ui/icons/IconBehance/index.vue'
import IconPixiv from '~/components/ui/icons/IconPixiv/index.vue'

const utils = useUtils()
const nuxtRouter = useRouter()
const { actSmoothScroll } = useUtils()
const { $const } = useNuxtApp()
const { snsInfos } = $const

const currentYear: number = new Date().getFullYear()

const footerMenuInfos: {
  id: string
  menuText: string
  url: string
  elmId?: string
}[] = [
  {
    id: routes.top.id,
    menuText: routes.top.menuText,
    url: routes.top.url({}),
  },
  {
    id: routes.blogs.id,
    menuText: routes.blogs.menuText,
    url: routes.blogs.url({}),
  },
  {
    id: routes.about.id,
    menuText: routes.about.menuText,
    url: routes.about.url({}),
  },
  {
    id: routes.works.id,
    menuText: routes.works.menuText,
    url: routes.works.url({}),
  },
  {
    id: routes.hobby.id,
    menuText: routes.hobby.menuText,
    url: routes.hobby.url({}),
  },
  {
    id: routes.contact.id,
    menuText: routes.contact.menuText,
    url: routes.contact.url({}),
  },
]

const movePage = ({ url, id }: { url: string; id?: string }) => {
  if (id && document.querySelector(`#${id}`)) {
    actSmoothScroll(`#${id}`)
    return
  }
  nuxtRouter.push(url)
}

const footerSnsInfos: {
  id: string
  url: string
  title: string
  icon: DefineComponent<{}, {}, {}, {}, {}>
}[] = [
  {
    id: snsInfos.twitter.id,
    url: snsInfos.twitter.url,
    title: snsInfos.twitter.title,
    icon: IconTwitter,
  },
  {
    id: snsInfos.instagram.id,
    url: snsInfos.instagram.url,
    title: snsInfos.instagram.title,
    icon: IconInstagram,
  },
  {
    id: snsInfos.github.id,
    url: snsInfos.github.url,
    title: snsInfos.github.title,
    icon: IconGitHub,
  },
  {
    id: snsInfos.youtube.id,
    url: snsInfos.youtube.url,
    title: snsInfos.youtube.title,
    icon: IconYouTube,
  },
  {
    id: snsInfos.qiita.id,
    url: snsInfos.qiita.url,
    title: snsInfos.qiita.title,
    icon: IconQiita,
  },
  {
    id: snsInfos.note.id,
    url: snsInfos.note.url,
    title: snsInfos.note.title,
    icon: IconNote,
  },
  {
    id: snsInfos.behance.id,
    url: snsInfos.behance.url,
    title: snsInfos.behance.title,
    icon: IconBehance,
  },
  {
    id: snsInfos.pixiv.id,
    url: snsInfos.pixiv.url,
    title: snsInfos.pixiv.title,
    icon: IconPixiv,
  },
]
</script>

<style lang="scss" scoped>
@use '~/assets/_scss/_global/index' as *;

.LayoutFooter {
  margin-top: auto;
}

.FooterBackToTop {
  position: fixed;
  z-index: $z-index-footer-1;
  bottom: 16px;
  right: 4vw;

  @include mxMediaQuerySm {
    right: 4.6vw;
  }

  @include mxMediaQueryMd {
    right: 32px;
  }
}

.Footer__contents {
  background-color: rgba($palette-blue-charcoal, 0.32);
  backdrop-filter: blur(20px);
  padding: 40px 0;

  @include mxMediaQueryMd {
    padding: 64px 0;
  }

  @include mxMediaQueryLg {
    padding: 80px 0;
  }
}

.FooterNavigation__items {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  @include mxGetMarginListItems(24px, 24px);

  @include mxMediaQuerySm {
    @include mxGetMarginListItems(24px, 32px);
  }

  @include mxMediaQueryMd {
    @include mxGetMarginListItems(24px, 40px);
  }
}

.FooterNavigation__item {
  width: 50%;
  @include mxGetPaddingListItem(24px, 24px);

  @include mxMediaQuerySm {
    width: auto;
    @include mxGetPaddingListItem(24px, 32px);
  }

  @include mxMediaQueryMd {
    @include mxGetPaddingListItem(24px, 40px);
  }
}

.FooterNavigation__link {
  &:not(:root) {
    display: flex;
    text-decoration: none;
    background-color: transparent;
    border: none;
    border-radius: 0;
    text-align: left;
    transition: 0.3s color, 0.3s text-shadow;
    font-weight: $font-bold;
    color: $palette-white;
    @include mxGetFontSize(14);

    @include mxMediaHover() {
      &:hover {
        color: $palette-sky-blue;
        text-shadow: 0px 0px 16px rgba($palette-sky-blue, 0.64), 0px 0px 16px rgba($palette-sky-blue, 0.64);
      }
    }
  }
}

.FooterNavigation__icon {
  flex-shrink: 0;
  margin-right: 12px;
  width: 10px;
  height: auto;
}

.FooterSns {
  overflow: hidden;
  margin-top: 40px;

  @include mxMediaQueryMd {
    margin-top: 64px;
  }

  @include mxMediaQueryLg {
    margin-top: 80px;
  }
}

.FooterSns__items {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  @include mxGetMarginListItems(24px, 24px);

  @include mxMediaQuerySm {
    @include mxGetMarginListItems(24px, 32px);
  }

  @include mxMediaQueryMd {
    @include mxGetMarginListItems(24px, 40px);
  }
}

.FooterSns__item {
  @include mxGetPaddingListItem(24px, 24px);

  @include mxMediaQuerySm {
    @include mxGetPaddingListItem(24px, 32px);
  }

  @include mxMediaQueryMd {
    @include mxGetPaddingListItem(24px, 40px);
  }
}

.FooterSns__link {
  &:not(:root) {
    display: flex;
    text-decoration: none;
    background-color: transparent;
    border: none;
    border-radius: 0;

    @include mxMediaHover() {
      &:hover {
        opacity: $opacity-hover;
      }
    }
  }
}

.FooterSns__icon {
  width: auto;
  height: 20px;
}

.Footer__copy {
  background: linear-gradient(90deg, $gradation-primary);
  padding: 24px;
}

.FooterCopy__paragraph {
  text-align: center;
  @include mxGetFontSize(12);
}
</style>
