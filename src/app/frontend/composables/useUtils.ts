interface vars {
  // スクロール位置
  winY: number;
}

export const useUtils = () => {
  const vars = useState<vars>('breakpoints', () => ({
    // スクロール位置
    winY: 0,
  }));

  return {
    vars: vars,
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
  };
};
