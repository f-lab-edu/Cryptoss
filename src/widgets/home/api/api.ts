export const homePageUrl = {
  coinGeckoUrl: (ticker: string) =>
    `https://api.coingecko.com/api/v3/search?query=${ticker}`,
  upbitCoinImgUrl: (ticker: string) => `https://static.upbit.com/logos/${ticker}.png`
};
