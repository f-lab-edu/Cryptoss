export interface MananaExchangeRate {
  date: string;
  name: string; // "KRW=X", "USDKRW=X" 등 - USDKRW=X의 rate에 환율이 들어있다.
  rate: number;
  timestamp: string;
}

export type ChartType = "candle" | "area";
