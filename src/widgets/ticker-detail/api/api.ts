import axios from "axios";
import { CANDLE_LIMIT } from "../lib/constants";

const tickerDetailUrl = {
  binanceCandleHistoryUrl: (symbol: string, interval: string) =>
    `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${CANDLE_LIMIT}`,
};

export const tickerDetailApi = {
  binanceCandleHistoryApi: async (symbol: string, interval: string) =>
    await axios.get(tickerDetailUrl.binanceCandleHistoryUrl(symbol, interval)),
};
