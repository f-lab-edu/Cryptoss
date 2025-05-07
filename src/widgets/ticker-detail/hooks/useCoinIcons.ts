import { useEffect, useState } from "react";
import { STABLE_COIN } from "../../home/lib/constants";
import { tickerDetailApi } from "../api/api";

function useCoinName(symbols: string[]) {
  const [coinNames, setCoinNames] = useState<string>("");

  useEffect(() => {
    if (symbols.length === 0) return;
    const tickers = symbols.map((symbol) =>
      symbol.replace(new RegExp(`${STABLE_COIN}$`), "").toLowerCase()
    );

    async function fetchIcons() {
      try {
        const entries: [string, string][] = await Promise.all(
          tickers.map(async (ticker) => {
            const { data } = await tickerDetailApi.coinGeckoApi(ticker);
            const coin = data.coins[0];
            return [ticker, coin.name];
          })
        );

        const coinNameMap = Object.fromEntries(entries);
        setCoinNames(coinNameMap[tickers[0]]);
      } catch (err) {
        console.error("CoinGecko 아이콘 로드 실패:", err);
      }
    }

    fetchIcons();
  }, [symbols]);

  return coinNames;
}

export default useCoinName;
