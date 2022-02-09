const title: string = 'After Works.';
const titleTemplate: string = '：' + title;

interface $const {
  meta: {
    title: string;
    titleTemplate: string;
    description: string;
  };
  pageInfos: {
    [key: string]: {
      menuText: string;
      url: string;
      iconClassName: string;
    };
  };
  className: {
    active: string;
  };
}

export default <$const>{
  // メタ情報
  meta: {
    title: title,
    titleTemplate: titleTemplate,
    description:
      '東京都在住のフロントエンドエンジニア：N/NE（ナイン）のポートフォリオ用Webサイトです。',
  },
  // ページ情報
  pageInfos: {
    // トップ
    top: {
      menuText: 'トップ',
      url: '',
      iconClassName: 'icon-home',
    },
    // ブログ
    blogs: {
      menuText: 'ブログ',
      url: 'blogs/',
      iconClassName: 'icon-article',
    },
    // 経歴
    about: {
      menuText: '経歴',
      url: 'about/',
      iconClassName: 'icon-person',
    },
    // 実績
    works: {
      menuText: '実績',
      url: 'works/',
      iconClassName: 'icon-star',
    },
    // お問い合わせ
    contact: {
      menuText: 'お問い合わせ',
      url: 'contact/',
      iconClassName: 'icon-mail',
    },
  },
  // クラス名
  className: {
    // 活性
    active: 'is-active',
  },
};
