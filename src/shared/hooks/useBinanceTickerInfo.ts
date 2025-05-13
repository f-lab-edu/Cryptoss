import { useState } from "react";
import { commonWsUrl } from "../api/ws";
import useWebSocket from "@/shared/hooks/useWebSocket";

interface BinanceTickerInfo {
  s: string; // Symbol
  c: string; // 마지막 체결가 (price)
  P: string; // 24h 등락률 (price change percent)
}

interface BinanceCombinedStreamMsg {
  stream: string; // ex) "btcusdc@ticker" 형태로 온다
  data: BinanceTickerInfo;
}

const useBinanceTickerInfo = (symbols: string[]) => {
  const [infos, setInfos] = useState<
    Record<string, { price: string; changePct: string }>
  >({});
  const streams = symbols.map((symbol) => `${symbol}@ticker`).join("/");

  useWebSocket(commonWsUrl.binanceWsUrl(streams), {
    onMessage: (e) => {
      const res = JSON.parse(e.data) as BinanceCombinedStreamMsg;
      const symbol = res.stream.split("@")[0];
      setInfos((prev) => ({
        ...prev,
        [symbol]: {
          price: res.data.c,
          changePct: res.data.P,
        },
      }));
    },
    enabled: symbols.length > 0,
  });

  return infos;
};

export default useBinanceTickerInfo;
