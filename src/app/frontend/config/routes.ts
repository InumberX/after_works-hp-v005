import $const from '~/config/const'

export const routes: {
  [key: string]: {
    id: string
    title: string
    description: string
    menuText: string
    url: ({ id }: { id?: number }) => string
  }
} = {
  // トップ
  top: {
    id: 'top',
    title: '',
    description: '',
    menuText: 'トップ',
    url: () => '/',
  },
  // ブログ
  blogs: {
    id: 'blogs',
    title: 'ブログ',
    description: `${$const.meta.defaultDescription}このページでは、私が投稿した記事の一覧を閲覧できます。`,
    menuText: 'ブログ',
    url: () => '/blogs',
  },
  // ブログ詳細
  blogsDetail: {
    id: 'blogsDetail',
    title: 'ブログ',
    description: '',
    menuText: 'ブログ',
    url: ({ id }) => `/blogs/${id}`,
  },
  // 経歴
  about: {
    id: 'about',
    title: '経歴',
    description: `${$const.meta.defaultDescription}このページでは、私のプロフィールやこれまでの経験、担当業務等をご紹介します。`,
    menuText: '経歴',
    url: () => '/about',
  },
  // 実績
  works: {
    id: 'works',
    title: '実績',
    description: `${$const.meta.defaultDescription}このページでは、私のこれまでの実績・制作物の一覧を閲覧できます。`,
    menuText: '実績',
    url: () => '/works',
  },
  // 実績詳細
  worksDetail: {
    id: 'worksDetail',
    title: '実績',
    description: '',
    menuText: '実績',
    url: ({ id }) => `/works/${id}`,
  },
  // 趣味
  hobby: {
    id: 'hobby',
    title: '趣味',
    description: `${$const.meta.defaultDescription}このページでは、私の趣味および学習のために制作したものをご紹介します。`,
    menuText: '趣味',
    url: () => '/hobby',
  },
  // 趣味詳細
  hobbyDetail: {
    id: 'hobbyDetail',
    title: '趣味',
    description: '',
    menuText: '趣味',
    url: ({ id }) => `/hobby/${id}`,
  },
  // お問い合わせ
  contact: {
    id: 'contact',
    title: 'お問い合わせ',
    description: `${$const.meta.defaultDescription}お問い合わせはこちらのページからお気軽にご連絡ください。`,
    menuText: 'お問い合わせ',
    url: () => '/contact',
  },
  // お問い合わせ完了
  contactFinish: {
    id: 'contactFinish',
    title: 'お問い合わせ完了',
    description: '',
    menuText: 'お問い合わせ完了',
    url: () => '/contact/finish',
  },
}
