export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const feedString = `User-agent: *
  Sitemap: ${config.siteUrl}sitemap.xml
  `;
  event.res.setHeader('content-type', 'text/xml');
  event.res.end(feedString);
});
