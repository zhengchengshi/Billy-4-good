import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // layout: {},
  routes: [{ path: '/', component: '@/pages/index' }],
  fastRefresh: {},
  links: [
    {
      rel: 'icon',
      href: 'https://file.bytedance.cool/img/158232067acba7fec35dbe2ba953725c.ico',
    },
  ],
});
