<template>
  <div class="profile-box">
    <div class="profile-title-box">
      <figure class="profile-img-box">
        <img
          :src="`${config.baseDir}assets/img/img-profile.svg?${config.cashBuster}`"
          alt=""
          class="profile-img"
          width="80"
          height="80"
        />
      </figure>
      <div class="profile-title">
        <h2 class="profile-title-main">N/NE</h2>
        <span class="profile-title-sub">（ナイン）</span>
      </div>
    </div>
    <div class="profile-contents">
      <div class="profile-description-box">
        <div
          v-if="qualifications.length > 0"
          class="profile-description-contents"
        >
          <div class="profile-description-title-box">
            <h3 class="profile-description-title">資格</h3>
          </div>
          <div class="profile-description-items-box">
            <ul class="profile-description-items">
              <li
                v-for="qualification in qualifications"
                :key="qualification.name"
                class="profile-description-item"
              >
                <a
                  v-if="qualification.url"
                  :href="qualification.url"
                  class="profile-description-link"
                  target="_blank"
                  rel="noopener"
                >
                  <span class="profile-description-link-text">
                    {{ qualification.name }}
                  </span>
                </a>
                <span v-else class="profile-description-text">
                  {{ qualification.name }}
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div v-if="skills.length > 0" class="profile-description-contents">
          <div class="profile-description-title-box">
            <h3 class="profile-description-title">スキル</h3>
          </div>
          <div class="profile-description-items-box">
            <ul class="profile-description-items">
              <li
                v-for="skill in skills"
                :key="skill.text"
                class="profile-description-item"
              >
                <span class="profile-description-text">
                  {{ skill.text }}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();

type Props = {
  qualifications: qualification[];
  skills: skill[];
};

const { qualifications, skills } = defineProps<Props>();
</script>

<style lang="scss" scoped>
@use '~/assets/_scss/_global/index' as *;

// 変数
$color-profile_description_title-text: $palette-boulder;

$color-profile_description_item-border: $palette-resolution_blue;

.profile-box {
  max-width: 960px;
  margin: 0 auto;
}
.profile-title-box {
  display: flex;
  align-items: center;
}
.profile-img-box {
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  border-radius: 120px;
  overflow: hidden;
}
.profile-img {
  width: 80px;
  height: 80px;
}
.profile-title {
  display: flex;
  align-items: center;
  padding-left: 16px;
}
.profile-title-main {
  font-size: 2.4rem;
  font-weight: 700;
  margin-right: 8px;
}
.profile-title-sub {
  font-size: 1.4rem;
}
.profile-description-contents {
  display: flex;
  margin-top: 24px;
}
.profile-description-title-box {
  flex-shrink: 0;
  min-width: 72px;
  padding-right: 8px;
}
.profile-description-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: $color-profile_description_title-text;
}
.profile-description-items-box {
  padding-top: 2px;
}
.profile-description-items {
  > .profile-description-item {
    &:first-of-type {
      margin-top: 0;
    }
  }
}
.profile-description-item {
  margin-top: 16px;
  padding-left: 16px;
  position: relative;
  &:before {
    content: '';
    background-color: $color-profile_description_item-border;
    display: block;
    width: 8px;
    height: 8px;
    border-radius: 8px;
    position: absolute;
    top: 8px;
    left: 0;
  }
}
@include mxMediaQuery($bp-sm) {
  .profile-img-box {
    width: 120px;
    height: 120px;
  }
  .profile-img {
    width: 120px;
    height: 120px;
  }
  .profile-title {
    padding-left: 40px;
  }
  .profile-description-title-box {
    min-width: 88px;
  }
  .profile-contents {
    padding-left: 160px;
    margin-top: -56px;
  }
}
</style>
