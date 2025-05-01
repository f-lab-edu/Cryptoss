import { useRef, useEffect } from "react";
import {
  createChart,
  CandlestickSeries,
  // ISeriesApi,
  CandlestickData,
  UTCTimestamp,
} from "lightweight-charts";
import { tickerDetailApi } from "../api/api";
import { tickerDetailWsUrl } from "../api/ws";
import { KST_OFFSET } from "../lib/constants";

interface BinanceChartProps {
  symbol: string;
  interval?: string;
  width?: number;
  height?: number;
}

export default function LiveTradingChart({
  symbol,
  interval = "15m",
  width = 660,
  height = 400,
}: BinanceChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

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
    });
    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#26a69a",
      downColor: "#ef5350",
      wickVisible: true,
      borderVisible: false,
    });
    // seriesRef.current = candleSeries;

    const getCandleHistory = async () => {
      const { data } = await tickerDetailApi.binanceCandleHistoryApi(
        symbol,
        interval
      );

      const candleHistoryData: CandlestickData<UTCTimestamp>[] = data.map(
        (d: never[]) => ({
          time: ((d[0] + KST_OFFSET) / 1000) as UTCTimestamp,
          open: parseFloat(d[1]),
          high: parseFloat(d[2]),
          low: parseFloat(d[3]),
          close: parseFloat(d[4]),
        })
      );
      candleSeries.setData(candleHistoryData);
    };
    getCandleHistory();

    const ws = new WebSocket(
      tickerDetailWsUrl.binanceCandleWsUrl(symbol.toLocaleLowerCase(), interval)
    );
    ws.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      const k = msg.k;
      const tick: CandlestickData = {
        time: ((k.t + KST_OFFSET) / 1000) as UTCTimestamp,
        open: parseFloat(k.o),
        high: parseFloat(k.h),
        low: parseFloat(k.l),
        close: parseFloat(k.c),
      };
      candleSeries.update(tick);
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
  }, [symbol, interval, width, height]);

  return (
    <div>
      <div ref={containerRef} style={{ width: "100%", height }} />
    </div>
  );
}
