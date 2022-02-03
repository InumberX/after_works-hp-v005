import $const from '~/config/const';
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      const: $const,
    },
  };
});
