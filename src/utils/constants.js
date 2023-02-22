const SHORTFILM_DURATION = 40;
const SCREEN_WIDTH_FEATURES = {
  desktop: {
    screen: 1100,
    movies: {
      sum: 12,
      more: 3,
    },
  },
  tablet: {
    screen: {
      min: 705,
      max: 1100,
    },
    movies: {
      sum: 8,
      more: 2,
    },
  },
  mobile: {
    movies: {
      sum: 5,
      more: 2,
    },
  },
};

export { SHORTFILM_DURATION, SCREEN_WIDTH_FEATURES };
