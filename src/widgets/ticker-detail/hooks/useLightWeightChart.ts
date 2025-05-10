import {
  AreaSeries,
  CandlestickSeries,
  ChartOptions,
  createChart,
  DeepPartial,
  ISeriesApi,
} from "lightweight-charts";
import { RefObject, useEffect, useRef } from "react";

const useLightWeightChart = (
  containerRef: RefObject<HTMLDivElement | null>,
  seriesType: "candle" | "area",
  chartOptions: DeepPartial<ChartOptions>
) => {
  const seriesRef = useRef<
    ISeriesApi<"Candlestick"> | ISeriesApi<"Area"> | null
  >(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, chartOptions);
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

    seriesRef.current = seriesType === "candle" ? candleSeries : areaSeries;
    const handleResize = () => {
      if (containerRef.current) {
        chart.applyOptions({ width: containerRef.current.clientWidth });
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [chartOptions, containerRef, seriesType]);

  return seriesRef;
};

export default useLightWeightChart;
