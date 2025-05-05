export const commonWsUrl = {
  binanceWsUrl: (streams: string) =>
    `wss://stream.binance.com:9443/stream?streams=${streams}`,
};
