import { db, Ticker } from "@/shared/db";
import { useEffect, useState, useCallback } from "react";

const useTickerApi = () => {
  const [tickers, setTickers] = useState<Ticker[]>([]);

  const load = useCallback(async () => {
    const all = await db.tickers.orderBy("id").toArray();
    setTickers(all);
  }, []);

  const add = useCallback(
    async (symbol: string) => {
      await db.tickers.put({ id: Number(new Date()), symbol });
      await load();
    },
    [load]
  );

  const remove = useCallback(
    async (id: number) => {
      await db.tickers.delete(id);
      await load();
    },
    [load]
  );

  useEffect(() => {
    load();
  }, [load]);

  return { tickers, addTicker: add, removeTicker: remove };
};

export default useTickerApi;
