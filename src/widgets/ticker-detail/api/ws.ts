export const tickerDetailWsUrl = {
  binanceCandleWsUrl: (symbol: string, interval: string) =>
    `wss://stream.binance.com:9443/ws/${symbol}@kline_${interval}`,
};
