interface vars {
  winY: number;
  isAdsenseLoaded: boolean;
  isPageTransitionFirstTime: boolean;
}

export const useUtils = () => {
  const vars = useState<vars>('vars', () => ({
    // スクロール位置
    winY: 0,
    // Google広告用のJSを読み込んだかどうか
    isAdsenseLoaded: false,
    // 画面遷移を一度でも行なったかどうか
    isPageTransitionFirstTime: false,
  }));

  // 値が空ではないか判定する処理
  const isNotEmpty = (val: any) => {
    let result = false;
    if (typeof val !== 'undefined' && val != null) {
      if (Array.isArray(val)) {
        if (val.length > 0) {
          result = true;
        }
      } else if (val !== 'null' && val !== '') {
        result = true;
      }
    }
    return result;
  };

  // 0埋め処理
  const zeroPadding = (val: string | number, length: number) => {
    let result: string = '';
    let zero: string = '';

    for (
      let i: number = 0, iLength: number = length;
      i < iLength;
      i = (i + 1) | 0
    ) {
      zero += '0';
    }

    result = (zero + val).slice(-length);

    return result;
  };

  return {
    vars: vars,
    // 値が空ではないか判定する処理
    isNotEmpty: isNotEmpty,
    // エスケープを行う処理
    escape: (val: string) => {
      let resutl: string = '';

      if (isNotEmpty(val)) {
        resutl = String(val)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/'/g, '&apos;')
          .replace(/"/g, '&quot;');
      }

      return resutl;
    },
    // エンコードを行う処理
    encode: (val: string) => {
      let resutl: string = '';

      if (isNotEmpty(val)) {
        resutl = encodeURIComponent(val);
      }

      return resutl;
    },
    // デコードを行う処理
    decode: (val: string) => {
      let resutl: string = '';

      if (isNotEmpty(val)) {
        resutl = decodeURIComponent(val);
      }

      return resutl;
    },
    // 改行コードを置換する処理
    replaceNewLine: (val: string) => {
      let resutl: string = '';

      if (isNotEmpty(val)) {
        resutl = val.replace(/\r?\n/g, '<br>');
      }

      return resutl;
    },
    // 親画面を固定する処理
    fixParentScreen: () => {
      vars.value.winY =
        window.pageYOffset || document.documentElement.scrollTop;
      const body = document.body;
      body.style.top = '-' + vars.value.winY + 'px';
      body.classList.add('is-fixed');
    },
    // 親画面の固定を解除する処理
    unfixParentScreen: () => {
      const body = document.body;
      body.classList.remove('is-fixed');
      body.style.top = '';
      scrollTo(0, vars.value.winY);
      vars.value.winY = 0;
    },
    // 0埋め処理
    zeroPadding: zeroPadding,
    // 日を取得する処理
    getDate: (date?: string | number | Date) => {
      let result: string = '';
      let targetDate: Date;

      if (typeof date !== 'undefined') {
        targetDate = new Date(date);
      } else {
        targetDate = new Date();
      }

      result =
        targetDate.getFullYear() +
        '/' +
        zeroPadding(targetDate.getMonth() + 1, 2) +
        '/' +
        zeroPadding(targetDate.getDate(), 2);

      return result;
    },
    // スムーススクロール
    actSmoothScroll: (target: string, speed?: number) => {
      let targetElm: HTMLBodyElement | null = null;
      let scrollSpeed: number = 300;

      if (target === '#') {
        targetElm = document.querySelector('body');
      } else {
        targetElm = document.querySelector(target);
      }

      // スクロールスピードが指定されている場合
      if (typeof speed !== 'undefined') {
        scrollSpeed = speed;
      }

      // スクロール先が存在する場合
      if (targetElm !== null) {
        const targetPos: number = targetElm.getBoundingClientRect().top;
        const winY: number =
          window.pageYOffset || document.documentElement.scrollTop;

        const { breakpoints } = useBreakpoints();
        let staggerPos = 24;

        // 特定の画面幅以上の場合
        if (
          breakpoints.value.flg.sm ||
          breakpoints.value.flg.md ||
          breakpoints.value.flg.lg ||
          breakpoints.value.flg.xl ||
          breakpoints.value.flg.xxl
        ) {
          staggerPos = 80;
        }

        window.scrollTo({
          top: targetPos + winY - staggerPos,
          behavior: 'smooth',
        });
      }
    },
  };
};
