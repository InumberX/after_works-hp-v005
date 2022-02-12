export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.$router.options.scrollBehavior = (
    to: any,
    from: any,
    savedPosition: any
  ) => {
    if (savedPosition) {
      return savedPosition;
    } else if (to.path !== from.path) {
      return { top: 0, left: 0 };
    } else {
      return undefined;
    }
  };
});
