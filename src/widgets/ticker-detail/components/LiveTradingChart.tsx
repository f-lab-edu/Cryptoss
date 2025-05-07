import { useRef, useState, useCallback } from "react";
import SeriesSelector from "./SeriesSelector";
import IntervalSelector from "./IntervalSelector";
import useUsdKrwExchangeRate from "@/shared/hooks/useUsdKrwExchangeRate";
import useCurrencyExchangeStore from "@/shared/store";
import { calcPrice } from "../lib/utils";
import useLightWeightChart from "@/widgets/ticker-detail/hooks/useLightWeightChart";
import useChartHistory from "@/widgets/ticker-detail/hooks/useChartHistory";
import useChartWs from "@/widgets/ticker-detail/hooks/useChartWs";

interface BinanceChartProps {
  symbol: string;
  width?: number;
  height?: number;
}

export default function LiveTradingChart({
  symbol,
  height = 400,
}: BinanceChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [seriesValue, setSeriesValue] = useState<"candle" | "area">("candle");
  const [intervalValue, setIntervalValue] = useState("4h");

  const krwRate = useUsdKrwExchangeRate();
  const isKrw = useCurrencyExchangeStore((state) => state.isKrw);

  const formatPrice = useCallback(
    (price: string) => calcPrice(parseFloat(price), krwRate, isKrw),
    [isKrw, krwRate]
  );

  const series = useLightWeightChart(containerRef, seriesValue, {
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
  useChartHistory(symbol, intervalValue, seriesValue, formatPrice, (data) =>
    series.current?.setData(data)
  );
  useChartWs(symbol, intervalValue, seriesValue, formatPrice, (data) =>
    series.current?.update(data)
  );

  return (
    <div className="col items-end gap-4">
      <div ref={containerRef} style={{ width: "100%", height }} />
      <div className="flex gap-4">
        <SeriesSelector
          value={seriesValue}
          setValue={(value: "candle" | "area") => setSeriesValue(value)}
        />
        <IntervalSelector
          value={intervalValue}
          setValue={(value: string) => setIntervalValue(value)}
        />
      </div>
    </div>
  );
}
