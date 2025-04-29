import { useEffect, useState } from "react";
import { MananaExchangeRate } from "../types";
import { commonApi } from "../api/api";
import { toast } from "sonner";
import useCurrencyExchangeStore from "../store";

const useUsdKrwExchangeRate = () => {
  const [rate, setRate] = useState<number | null>(null);
  const setExchangeError = useCurrencyExchangeStore(
    (state) => state.setExchangeError
  );

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
      } catch {
        setExchangeError(true);
        toast.error("환율 조회 오류", {
          description:
            "환율 조회에 오류가 있습니다. 통화 전환 기능이 제한됩니다.",
        });
      }
    };

    fetchRate();
    const id = setInterval(fetchRate, 300_000);
    return () => clearInterval(id);
  }, [setExchangeError]);

  return rate;
};

export default useUsdKrwExchangeRate;
