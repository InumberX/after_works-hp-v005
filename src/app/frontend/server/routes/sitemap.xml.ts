import { createClient, gql } from '@urql/core';
import $const from '~/config/const';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { siteUrl, lastmod, apiUrl, apiRoot } = config;
  const { pageInfos } = $const;
  const client = createClient({
    url: `${apiUrl}${apiRoot}`,
  });
  const sitemapInfos: {
    loc: string;
    lastmod: string;
    priority: string;
  }[] = [
    {
      loc: siteUrl,
      lastmod,
      priority: '1.00',
    },
    {
      loc: `${siteUrl}${pageInfos.blogs.url}`,
      lastmod,
      priority: '0.50',
    },
    {
      loc: `${siteUrl}${pageInfos.works.url}`,
      lastmod,
      priority: '0.50',
    },
    {
      loc: `${siteUrl}${pageInfos.hobby.url}`,
      lastmod,
      priority: '0.50',
    },
    {
      loc: `${siteUrl}${pageInfos.contact.url}`,
      lastmod,
      priority: '0.50',
    },
  ];

  const workInfos = await client
    .query(
      gql`
        query getWorks {
          works(
            pagination: { limit: -1 }
            sort: ["createdDate:desc", "id:desc"]
            filters: { flgHobby: { eq: false } }
          ) {
            data {
              id
              attributes {
                url
                updatedAt
              }
            }
          }
        }
      `,
      {}
    )
    .toPromise()
    .then((response) => {
      return response.data.works.data;
    })
    .catch(() => {
      return [];
    });

  const hobbyInfos = await client
    .query(
      gql`
        query getHobbies {
          works(
            pagination: { limit: -1 }
            sort: ["createdDate:desc", "id:desc"]
            filters: { flgHobby: { eq: true } }
          ) {
            data {
              id
              attributes {
                url
                updatedAt
              }
            }
          }
        }
      `,
      {}
    )
    .toPromise()
    .then((response) => {
      return response.data.works.data;
    })
    .catch(() => {
      return [];
    });

  const blogInfos = await client
    .query(
      gql`
        query getBlogs {
          works(
            pagination: { limit: -1 }
            sort: ["createdDate:desc", "id:desc"]
          ) {
            data {
              id
              attributes {
                updatedAt
              }
            }
          }
        }
      `,
      {}
    )
    .toPromise()
    .then((response) => {
      return response.data.works.data;
    })
    .catch(() => {
      return [];
    });

  const aboutInfo = await client
    .query(
      gql`
        query getAbout {
          about {
            data {
              attributes {
                updatedAt
              }
            }
          }
        }
      `,
      {}
    )
    .toPromise()
    .then((response) => {
      return response.data.about.data;
    })
    .catch(() => {
      return undefined;
    });

  for (let i = 0, iLength = workInfos.length; i < iLength; i = (i + 1) | 0) {
    const workInfo = workInfos[i];
    const { id, attributes } = workInfo;
    const { url, updatedAt } = attributes;

    sitemapInfos.push({
      loc: `${siteUrl}${pageInfos.works.url}${id}/`,
      lastmod: updatedAt,
      priority: '0.50',
    });

    if (!url || !url.startsWith(siteUrl)) {
      continue;
    }

    sitemapInfos.push({
      loc: url,
      lastmod,
      priority: '0.50',
    });
  }

  for (let i = 0, iLength = hobbyInfos.length; i < iLength; i = (i + 1) | 0) {
    const hobbyInfo = hobbyInfos[i];
    const { id, attributes } = hobbyInfo;
    const { url, updatedAt } = attributes;

    sitemapInfos.push({
      loc: `${siteUrl}${pageInfos.hobby.url}${id}/`,
      lastmod: updatedAt,
      priority: '0.50',
    });

    if (!url || !url.startsWith(siteUrl)) {
      continue;
    }

    sitemapInfos.push({
      loc: url,
      lastmod,
      priority: '0.50',
    });
  }

  for (let i = 0, iLength = blogInfos.length; i < iLength; i = (i + 1) | 0) {
    const blogInfo = blogInfos[i];
    const { id, attributes } = blogInfo;
    const { url, updatedAt } = attributes;

    sitemapInfos.push({
      loc: `${siteUrl}${pageInfos.blogs.url}${id}/`,
      lastmod: updatedAt,
      priority: '0.50',
    });
  }

  if (aboutInfo) {
    const { attributes } = aboutInfo;
    const { updatedAt } = attributes;

    sitemapInfos.push({
      loc: `${siteUrl}${pageInfos.about.url}`,
      lastmod: updatedAt,
      priority: '0.50',
    });
  }

  let sitemapString = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  `;

  for (let i = 0, iLength = sitemapInfos.length; i < iLength; i = (i + 1) | 0) {
    const sitemapInfo = sitemapInfos[i];

    sitemapString += `
      <url>
        <loc>${sitemapInfo.loc}</loc>
        <lastmod>${sitemapInfo.lastmod}</lastmod>
        <priority>${sitemapInfo.priority}</priority>
      </url>
    `;
  }

  sitemapString += `</urlset>`;

  event.res.setHeader('content-type', 'text/xml');
  event.res.end(sitemapString);
});
