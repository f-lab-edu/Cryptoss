import { useEffect, useState } from "react";
import { MananaExchangeRate } from "../types";
import { commonApi } from "../api/api";

const useUsdKrwExchangeRate = () => {
  const [rate, setRate] = useState<number | null>(null);

  useEffect(() => {
    const fetchRate = async () => {
      try {
        const { data } = await commonApi.getCurrencyExchange();

        if (Array.isArray(data)) {
          const usdRate = data.find(
            (item: MananaExchangeRate) => item.name === "USDKRW=X"
          );
          setRate(usdRate?.rate ?? null);
        }
      } catch (err) {
        console.error("환율 조회 실패", err);
      }
    };

    fetchRate();
    const id = setInterval(fetchRate, 300_000);
    return () => clearInterval(id);
  }, []);

  return rate;
};

export default useUsdKrwExchangeRate;
