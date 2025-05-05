import { useEffect, useRef, useState } from "react";
import { commonWsUrl } from "../api/ws";

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
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (symbols.length === 0) return;
    const streams = symbols.map((symbol) => `${symbol}@ticker`).join("/");
    const url = commonWsUrl.binanceWsUrl(streams);

    const connect = () => {
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => console.log("WS 연결 성공");
      ws.onmessage = (e) => {
        const res = JSON.parse(e.data) as BinanceCombinedStreamMsg;
        const symbol = res.stream.split("@")[0];
        setInfos((prev) => ({
          ...prev,
          [symbol]: {
            price: res.data.c,
            changePct: res.data.P,
          },
        }));
      };
      ws.onclose = () => console.log("WS 연결 종료");
    };

    connect();

    const onVisChange = () => {
      if (document.visibilityState === "visible") {
        connect();
      } else {
        wsRef.current?.close();
      }
    };
    document.addEventListener("visibilitychange", onVisChange);

    return () => {
      document.removeEventListener("visibilitychange", onVisChange);
      wsRef.current?.close();
    };
  }, [symbols]);

  return infos;
};

export default useBinanceTickerInfo;
