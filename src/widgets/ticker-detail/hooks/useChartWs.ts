import { tickerDetailWsUrl } from "@/widgets/ticker-detail/api/ws";
import { KST_OFFSET } from "@/widgets/ticker-detail/lib/constants";
import { AreaData, CandlestickData, UTCTimestamp } from "lightweight-charts";
import { useEffect } from "react";

const useChartWs = (
  symbol: string,
  interval: string,
  seriesType: "candle" | "area",
  formatPrice: (price: string) => number,
  setData: (data: CandlestickData | AreaData) => void
) => {
  useEffect(() => {
    const ws = new WebSocket(
      tickerDetailWsUrl.binanceCandleWsUrl(symbol.toLocaleLowerCase(), interval)
    );
    ws.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      const k = msg.k;

      if (seriesType === "candle") {
        const tick: CandlestickData = {
          time: ((k.t + KST_OFFSET) / 1000) as UTCTimestamp,
          open: formatPrice(k.o),
          high: formatPrice(k.h),
          low: formatPrice(k.l),
          close: formatPrice(k.c),
        };
        setData(tick);
      } else {
        const tick: AreaData = {
          time: ((k.t + KST_OFFSET) / 1000) as UTCTimestamp,
          value: parseFloat(k.c),
        };
        setData(tick);
      }
    };

    return () => {
      ws.close();
    };
  }, [symbol, interval, seriesType, formatPrice, setData]);
};

export default useChartWs;
