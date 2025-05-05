import axios from "axios";
import { MananaExchangeRate } from "../types";

export const commonUrl = {
  currencyExchangeUrl: () =>
    "https://api.manana.kr/exchange/rate/KRW/KRW,USD.json",
  upbitCoinImgUrl: (ticker: string) =>
    `https://static.upbit.com/logos/${ticker}.png`,
};

export const commonApi = {
  getCurrencyExchange: async () =>
    await axios.get<MananaExchangeRate[]>(commonUrl.currencyExchangeUrl()),
};
