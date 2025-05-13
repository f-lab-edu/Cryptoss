import { useEffect, useRef } from "react";

interface WSOptions {
  onMessage?: (e: MessageEvent) => void;
  enabled?: boolean;
}

const useWebSocket = (
  url: string,
  { onMessage, enabled = true }: WSOptions
) => {
  const wsRef = useRef<WebSocket>(null);

  useEffect(() => {
    if (!enabled) return;

    const connect = () => {
      const ws = new WebSocket(url);
      wsRef.current = ws;

      if (onMessage) ws.addEventListener("message", onMessage);
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
      if (onMessage) wsRef.current?.removeEventListener("message", onMessage);
      document.removeEventListener("visibilitychange", onVisChange);
      wsRef.current?.close();
    };
  }, [url, onMessage, enabled]);
};

export default useWebSocket;
