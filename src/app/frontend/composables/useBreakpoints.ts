interface breakpoints {
  point: {
    xs: 320;
    sm: 576;
    md: 768;
    lg: 992;
    xl: 1200;
    xxl: 1400;
  };
  flg: {
    xxs: boolean | null;
    xs: boolean | null;
    sm: boolean | null;
    md: boolean | null;
    lg: boolean | null;
    xl: boolean | null;
    xxl: boolean | null;
    [key: string]: boolean | null;
  };
}

export const useBreakpoints = () => {
  const breakpoints = useState<breakpoints>('breakpoints', () => ({
    point: {
      xs: 320,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1400,
    },
    flg: {
      xs: null,
      xxs: null,
      sm: null,
      md: null,
      lg: null,
      xl: null,
      xxl: null,
    },
  }));

  return {
    breakpoints: breakpoints,
  };
};
