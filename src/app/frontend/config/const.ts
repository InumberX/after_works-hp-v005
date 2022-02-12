const title: string = 'After Works.';
const titleTemplate: string = '：' + title;

interface $const {
  meta: {
    title: string;
    titleTemplate: string;
  };
  pageInfos: {
    [key: string]: {
      menuText?: string;
      url: string;
      iconClassName?: string;
      title?: string;
      description: string;
    };
  };
  snsInfos: {
    [key: string]: {
      url: string;
      iconClassName: string;
      title: string;
    };
  };
  className: {
    [key: string]: string;
  };
  url: {
    [key: string]: string;
  };
  pageSize: number;
  tagsLimit: number;
}

export default <$const>{
  // メタ情報
  meta: {
    title: title,
    titleTemplate: titleTemplate,
  },
  // ページ情報
  pageInfos: {
    // トップ
    top: {
      menuText: 'トップ',
      url: '',
      iconClassName: 'icon-home',
      title: title,
      description:
        '東京都在住のフロントエンドエンジニア：N/NE（ナイン）のポートフォリオ用Webサイトです。',
    },
    // ブログ
    blogs: {
      menuText: 'ブログ',
      url: 'blogs/',
      iconClassName: 'icon-article',
      title: 'ブログ',
      description:
        '東京都在住のフロントエンドエンジニア：N/NE（ナイン）のポートフォリオ用Webサイトです。このページでは、私が投稿した記事の一覧を閲覧できます。',
    },
    // 経歴
    about: {
      menuText: '経歴',
      url: 'about/',
      iconClassName: 'icon-person',
      title: '経歴',
      description:
        '東京都在住のフロントエンドエンジニア：N/NE（ナイン）のポートフォリオ用Webサイトです。このページでは、私のプロフィールやこれまでの経験、担当業務等をご紹介します。',
    },
    // 実績
    works: {
      menuText: '実績',
      url: 'works/',
      iconClassName: 'icon-star',
      title: '実績',
      description:
        '東京都在住のフロントエンドエンジニア：N/NE（ナイン）のポートフォリオ用Webサイトです。このページでは、私のこれまでの実績・制作物の一覧を閲覧できます。',
    },
    // お問い合わせ
    contact: {
      menuText: 'お問い合わせ',
      url: 'contact/',
      iconClassName: 'icon-mail',
      title: 'お問い合わせ',
      description:
        '東京都在住のフロントエンドエンジニア：N/NE（ナイン）のポートフォリオ用Webサイトです。お問い合わせはこちらのページからお気軽にご連絡ください。',
    },
  },
  // SNS情報
  snsInfos: {
    twitter: {
      url: 'https://twitter.com/InumberX/',
      iconClassName: 'icon-twitter',
      title: 'Twitter',
    },
    instagram: {
      url: 'https://www.instagram.com/inumberx/',
      iconClassName: 'icon-instagram',
      title: 'Instagram',
    },
    github: {
      url: 'https://github.com/InumberX/',
      iconClassName: 'icon-github',
      title: 'GitHub',
    },
    youtube: {
      url: 'https://www.youtube.com/channel/UCjd4GJBAQ1eIs-dXPEBbYng/',
      iconClassName: 'icon-youtube',
      title: 'YouTube',
    },
    qiita: {
      url: 'https://qiita.com/inumberx/',
      iconClassName: 'icon-qiita',
      title: 'Qiita',
    },
    note: {
      url: 'https://note.mu/inumberx/',
      iconClassName: 'icon-note',
      title: 'note',
    },
    behance: {
      url: 'https://www.behance.net/inumberx21ac/',
      iconClassName: 'icon-behance',
      title: 'Behance',
    },
    pixiv: {
      url: 'https://www.pixiv.net/users/2146818/',
      iconClassName: 'icon-pixiv',
      title: 'pixiv',
    },
  },
  // クラス名
  className: {
    // 活性
    active: 'is-active',
  },
  // URL
  url: {
    // 画像
    img: 'assets/img/',
    // ロゴ画像
    imgLogo: 'assets/img/img-logo.svg',
    // SNSシェア画像
    imgOgp: 'assets/img/img-ogp.png',
    // 空画像
    imgEmpty: 'assets/img/img-empty.jpg',
    // API
    api: 'api/',
  },
  // 1ページの件数
  pageSize: 12,
  // タグの表示件数
  tagsLimit: 5,
};
