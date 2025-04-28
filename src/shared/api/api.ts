import axios from "axios";
import { MananaExchangeRate } from "../types";

const commonUrl = {
  currencyExchangeUrl: () =>
    "https://api.manana.kr/exchange/rate/KRW/KRW,USD.json",
};

export const commonApi = {
  getCurrencyExchange: async () =>
    await axios.get<MananaExchangeRate[]>(commonUrl.currencyExchangeUrl()),
};
