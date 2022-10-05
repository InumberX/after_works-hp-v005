<template>
  <main class="l-main">
    <PartsPageTitle
      :title="$const.pageInfos.about.title"
      :sub-title="$const.pageInfos.about.subTitle"
    />

    <CommonBreadcrumb :breadcrumb-infos="breadcrumbInfos" />

    <div class="l-section is-short">
      <div class="l-inner">
        <PartsLead :leads="leads" />
      </div>
    </div>

    <section class="l-section is-paint">
      <div class="l-inner">
        <PartsProfile :qualifications="qualifications" :skills="skills" />
      </div>
    </section>

    <div class="l-section">
      <div class="l-inner">
        <PartsHistory :histories="histories" />
      </div>
    </div>

    <CommonContact />
  </main>
</template>

<script setup lang="ts">
import { useClientHandle, gql } from '@urql/vue';
const urql = useClientHandle();
const { $const } = useNuxtApp();
const config = useRuntimeConfig();
const breadcrumbInfos: breadcrumbInfos[] = [
  {
    url: '',
    text: $const.pageInfos.about.title,
  },
];
const meta = <meta>{
  title: $const.pageInfos.about.title + $const.meta.titleTemplate,
  description: $const.pageInfos.about.description,
  ogImage: config.siteUrl + $const.url.imgOgp,
  canonical: config.siteUrl + $const.pageInfos.about.url,
};

const aboutResult = await urql.useQuery({
  query: gql`
    query getAbout {
      about {
        data {
          attributes {
            lead {
              text
            }
            qualification {
              name
              url
            }
            skill {
              text
            }
            history {
              year
              content {
                from
                to
                title
                positions: position_tags(sort: ["displayOrder:asc"]) {
                  data {
                    id
                    attributes {
                      name
                    }
                  }
                }
                programs: program_tags(sort: ["displayOrder:asc"]) {
                  data {
                    id
                    attributes {
                      name
                    }
                  }
                }
                cmses: cms_tags(sort: ["displayOrder:asc"]) {
                  data {
                    id
                    attributes {
                      name
                    }
                  }
                }
                designs: design_tags(sort: ["displayOrder:asc"]) {
                  data {
                    id
                    attributes {
                      name
                    }
                  }
                }
                others: other_tags(sort: ["displayOrder:asc"]) {
                  data {
                    id
                    attributes {
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `,
});

const leads = <lead[]>aboutResult.data.value.about.data.attributes.lead;

const qualifications = <qualification[]>(
  aboutResult.data.value.about.data.attributes.qualification
);

const skills = <skill[]>aboutResult.data.value.about.data.attributes.skill;

const histories = <history[]>(
  aboutResult.data.value.about.data.attributes.history
);

useHead({
  title: meta.title,
  meta: [
    {
      name: 'description',
      content: meta.description,
    },
    {
      property: 'og:image',
      content: meta.ogImage,
    },
    {
      property: 'og:title',
      content: meta.title,
    },
    {
      property: 'og:description',
      content: meta.description,
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: meta.canonical,
    },
  ],
});
</script>
