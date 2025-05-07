import axios from "axios";
import { CANDLE_LIMIT } from "../lib/constants";
import { SearchCoin } from "@/widgets/home/types";

const tickerDetailUrl = {
  binanceCandleHistoryUrl: (symbol: string, interval: string) =>
    `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${CANDLE_LIMIT}`,
  coinGeckoUrl: (ticker: string) =>
    `https://api.coingecko.com/api/v3/search?query=${ticker}`,
};

export const tickerDetailApi = {
  binanceCandleHistoryApi: async (symbol: string, interval: string) =>
    await axios.get(tickerDetailUrl.binanceCandleHistoryUrl(symbol, interval)),
  coinGeckoApi: async (ticker: string) =>
    await axios.get<{ coins: SearchCoin[] }>(
      tickerDetailUrl.coinGeckoUrl(ticker)
    ),
};
