import { AdSenseInfo } from '~/types/adSense'

type SnsInfo = {
  id: string
  url: string
  title: string
}

type $Const = {
  meta: {
    defaultDescription: string
  }
  adsId: string
  ads: {
    [key: string]: AdSenseInfo[]
  }
  snsInfos: {
    [key: string]: SnsInfo
  }
}

export default <$Const>{
  // メタ情報
  meta: {
    defaultDescription: '東京都在住のフロントエンドエンジニア：N/NE（ナイン）のポートフォリオ用Webサイトです。',
  },
  // 広告
  adsId: 'ca-pub-6711167987812480',
  ads: {
    contact: [
      {
        slot: '7889882209',
        responsive: false,
        style: 'display:inline-block;width:300px;height:300px',
      },
      {
        slot: '6465119893',
        responsive: false,
        style: 'display:inline-block;width:300px;height:300px',
      },
      /*
      {
        slot: '4704589318',
        responsive: false,
        style: 'display:inline-block;width:300px;height:300px',
      },
      */
    ],
    side: [
      {
        slot: '6287815405',
        responsive: false,
        style: 'display:inline-block;width:300px;height:300px',
      },
      /*
      {
        slot: '2348570399',
        responsive: false,
        style: 'display:inline-block;width:300px;height:300px',
      },
      {
        slot: '7225492559',
        responsive: false,
        style: 'display:inline-block;width:300px;height:300px',
      },
      */
    ],
  },
  snsInfos: {
    twitter: {
      id: 'twitter',
      url: 'https://twitter.com/InumberX/',
      title: 'Twitter',
    },
    instagram: {
      id: 'instagram',
      url: 'https://www.instagram.com/inumberx/',
      title: 'Instagram',
    },
    github: {
      id: 'github',
      url: 'https://github.com/InumberX/',
      title: 'GitHub',
    },
    youtube: {
      id: 'youtube',
      url: 'https://www.youtube.com/channel/UCjd4GJBAQ1eIs-dXPEBbYng/',
      title: 'YouTube',
    },
    qiita: {
      id: 'qiita',
      url: 'https://qiita.com/inumberx/',
      title: 'Qiita',
    },
    note: {
      id: 'note',
      url: 'https://note.mu/inumberx/',
      title: 'note',
    },
    behance: {
      id: 'behance',
      url: 'https://www.behance.net/inumberx21ac/',
      title: 'Behance',
    },
    pixiv: {
      id: 'pixiv',
      url: 'https://www.pixiv.net/users/2146818/',
      title: 'pixiv',
    },
  },
}
