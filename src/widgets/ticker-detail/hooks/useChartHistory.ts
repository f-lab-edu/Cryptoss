import { ChartType } from "@/shared/types";
import { tickerDetailApi } from "@/widgets/ticker-detail/api/api";
import { KST_OFFSET } from "@/widgets/ticker-detail/lib/constants";
import { AreaData, CandlestickData, UTCTimestamp } from "lightweight-charts";
import { useEffect } from "react";

const useChartHistory = (
  symbol: string,
  interval: string,
  seriesType: ChartType,
  formatPrice: (price: string) => number,
  setData: (
    data: CandlestickData<UTCTimestamp>[] | AreaData<UTCTimestamp>[]
  ) => void
) => {
  useEffect(() => {
    (async () => {
      const { data } = await tickerDetailApi.binanceCandleHistoryApi(
        symbol,
        interval
      );

      if (seriesType === "candle") {
        const candleHistoryData: CandlestickData<UTCTimestamp>[] = data.map(
          (d: never[]) => ({
            time: ((d[0] + KST_OFFSET) / 1000) as UTCTimestamp,
            open: formatPrice(d[1]),
            high: formatPrice(d[2]),
            low: formatPrice(d[3]),
            close: formatPrice(d[4]),
          })
        );
        setData(candleHistoryData);
      } else {
        const areaHistoryData: AreaData<UTCTimestamp>[] = data.map(
          (d: never[]) => ({
            time: ((d[0] + KST_OFFSET) / 1000) as UTCTimestamp,
            value: parseFloat(d[4]),
          })
        );
        setData(areaHistoryData);
      }
    })();
  }, [formatPrice, symbol, interval, seriesType, setData]);
};

export default useChartHistory;
