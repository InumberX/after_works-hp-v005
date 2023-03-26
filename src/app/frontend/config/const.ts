import { AdSenseInfo } from '~/types/adSense'

type SnsInfo = {
  url: string
  iconClassName: string
  title: string
}

type $const = {
  meta: {
    defaultDescription: string
  }
  adsId: string
  ads: {
    [key: string]: AdSenseInfo[]
  }
}

export default <$const>{
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
}
