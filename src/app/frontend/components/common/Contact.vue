<template>
  <section class="l-section is-paint">
    <PartsSectionTitle
      title="お問い合わせ"
      sub-title="Contact"
      :flg-simple="true"
    />
    <div class="l-contact">
      <div class="l-inner">
        <div class="contact-box">
          <p class="contact-lead">
            「ランディングページを制作してほしい」、「Wordpressを使って更新性の高いWebサイトを作りたい」、
            <br class="lg-obj xl-obj" />
            「JavaScriptを用いてWebサイトにリッチな表現を取り入れてほしい」などお客様の様々なご要望にお応えいたします。<br />
            また、デザインのみ、コーディングのみ行ってほしいといったご依頼にも柔軟に対応できます。<br />
            まずはお気軽にお問い合わせください。
          </p>
          <div class="contact-page-link-box">
            <NuxtLink
              :to="`${config.baseDir}${$const.pageInfos.contact.url}`"
              class="primary-btn contact-page-link"
            >
              <CommonIcon class-name="icon-mail" />
              <span class="primary-btn-text">お問い合わせ</span>
            </NuxtLink>
          </div>
        </div>
        <PartsAdSenseList
          :ad-sense-infos="$const.ads.contact"
          :flg-init="true"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { $const } = useNuxtApp();
const config = useRuntimeConfig();
</script>

<style lang="scss" scoped>
@use '~/assets/_scss/_global/index' as g;

.contact-box {
  margin-top: 16px;
}
.contact-page-link-box {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}
@include g.mxMediaQuery(g.$bp-sm) {
  .contact-box {
    margin-top: 24px;
  }
  .contact-lead {
    text-align: center;
    font-size: 1.8rem;
  }
  .contact-page-link-box {
    margin-top: 40px;
  }
}
</style>
