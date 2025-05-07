import { useRef, useEffect, useState, useCallback } from "react";
import {
  createChart,
  CandlestickSeries,
  CandlestickData,
  UTCTimestamp,
  ISeriesApi,
  AreaSeries,
  AreaData,
} from "lightweight-charts";
import { tickerDetailApi } from "../api/api";
import { tickerDetailWsUrl } from "../api/ws";
import { KST_OFFSET } from "../lib/constants";
import SeriesSelector from "./SeriesSelector";
import IntervalSelector from "./IntervalSelector";
import useUsdKrwExchangeRate from "@/shared/hooks/useUsdKrwExchangeRate";
import useCurrencyExchangeStore from "@/shared/store";
import { calcPrice } from "../lib/utils";

interface BinanceChartProps {
  symbol: string;
  width?: number;
  height?: number;
}

export default function LiveTradingChart({
  symbol,
  width = 660,
  height = 400,
}: BinanceChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const seriesRef = useRef<
    ISeriesApi<"Candlestick"> | ISeriesApi<"Area"> | null
  >(null);
  const wsRef = useRef<WebSocket | null>(null);

  const [seriesValue, setSeriesValue] = useState("candle");
  const [intervalValue, setIntervalValue] = useState("4h");

  const krwRate = useUsdKrwExchangeRate();
  const isKrw = useCurrencyExchangeStore((state) => state.isKrw);

  const formatPrice = useCallback(
    (price: string) => calcPrice(parseFloat(price), krwRate, isKrw),
    [isKrw, krwRate]
  );

  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      layout: {
        background: { color: "oklch(0.21 0.0098 285.51)" },
        textColor: "#dddddd",
      },
      grid: {
        vertLines: { color: "#444444" },
        horzLines: { color: "#444444" },
      },
      rightPriceScale: { borderColor: "#555555" },
      timeScale: { borderColor: "#555555", timeVisible: true },
      localization: {
        priceFormatter: (price: number) =>
          isKrw ? price.toLocaleString("ko-KR") : price.toLocaleString("en-US"),
      },
    });
    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#26a69a",
      downColor: "#ef5350",
      wickVisible: true,
      borderVisible: false,
    });
    const areaSeries = chart.addSeries(AreaSeries, {
      topColor: "rgba(38, 166, 154, 0.5)",
      bottomColor: "rgba(38, 166, 154, 0.1)",
      lineColor: "#26a69a",
      lineWidth: 2,
    });

    seriesRef.current = seriesValue === "candle" ? candleSeries : areaSeries;
    const series = seriesRef.current;

    const getCandleHistory = async () => {
      if (!series) return;

      const { data } = await tickerDetailApi.binanceCandleHistoryApi(
        symbol,
        intervalValue
      );

      if (seriesValue === "candle") {
        const candleHistoryData: CandlestickData<UTCTimestamp>[] = data.map(
          (d: never[]) => ({
            time: ((d[0] + KST_OFFSET) / 1000) as UTCTimestamp,
            open: formatPrice(d[1]),
            high: formatPrice(d[2]),
            low: formatPrice(d[3]),
            close: formatPrice(d[4]),
          })
        );
        series.setData(candleHistoryData);
      } else {
        const areaHistoryData: AreaData<UTCTimestamp>[] = data.map(
          (d: never[]) => ({
            time: ((d[0] + KST_OFFSET) / 1000) as UTCTimestamp,
            value: parseFloat(d[4]),
          })
        );
        series.setData(areaHistoryData);
      }
    };
    getCandleHistory();

    const ws = new WebSocket(
      tickerDetailWsUrl.binanceCandleWsUrl(
        symbol.toLocaleLowerCase(),
        intervalValue
      )
    );
    ws.onmessage = (e) => {
      if (!series) return;

      const msg = JSON.parse(e.data);
      const k = msg.k;

      if (seriesValue === "candle") {
        const tick: CandlestickData = {
          time: ((k.t + KST_OFFSET) / 1000) as UTCTimestamp,
          open: formatPrice(k.o),
          high: formatPrice(k.h),
          low: formatPrice(k.l),
          close: formatPrice(k.c),
        };
        series.update(tick);
      } else {
        const tick: AreaData = {
          time: ((k.t + KST_OFFSET) / 1000) as UTCTimestamp,
          value: parseFloat(k.c),
        };
        series.update(tick);
      }
    };
    wsRef.current = ws;

    const handleResize = () => {
      if (containerRef.current) {
        chart.applyOptions({ width: containerRef.current.clientWidth });
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      ws.close();
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [symbol, intervalValue, width, height, seriesValue, formatPrice, isKrw]);

  return (
    <div className="col items-end gap-4">
      <div ref={containerRef} style={{ width: "100%", height }} />
      <div className="flex gap-4">
        <SeriesSelector
          value={seriesValue}
          setValue={(value: string) => setSeriesValue(value)}
        />
        <IntervalSelector
          value={intervalValue}
          setValue={(value: string) => setIntervalValue(value)}
        />
      </div>
    </div>
  );
}
