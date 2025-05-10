import { commonUrl } from "@/shared/api/api";
import TickerCard from "@/shared/components/common/TickerCard";
import { Ticker } from "@/shared/db";
import useBinanceTickerInfo from "@/shared/hooks/useBinanceTickerInfo";
import useUsdKrwExchangeRate from "@/shared/hooks/useUsdKrwExchangeRate";
import { cn, formatToKrw, formatToUsd } from "@/shared/lib/utils";
import useCurrencyExchangeStore from "@/shared/store";
import { STABLE_COIN } from "@/widgets/home/lib/constants";
import { useMemo } from "react";

interface Props {
  ticker: Ticker;
}

function AddedTickerItem({ ticker }: Props) {
  const refinedTicker = useMemo(
    () => [(ticker.symbol + STABLE_COIN).toLocaleLowerCase()],
    [ticker.symbol]
  );
  const tickerInfo = useBinanceTickerInfo(refinedTicker);
  const krwRate = useUsdKrwExchangeRate();
  const info = tickerInfo[(ticker.symbol + STABLE_COIN).toLocaleLowerCase()];
  const changePct = info?.changePct ? parseFloat(info.changePct) : 0;
  const krwPrice = info?.price ? `${formatToKrw(info.price, krwRate)}원` : "-";
  const usdPrice = info?.price ? `$${formatToUsd(info.price)}` : "-";
  const isKrw = useCurrencyExchangeStore((state) => state.isKrw);

  return (
    <div className="px-1 py-2">
      <TickerCard
        src={commonUrl.upbitCoinImgUrl(ticker.symbol)}
        ticker={ticker.symbol}
      >
        <div className="col text-right">
          <p className="text-foreground-toss text-toss-md font-bold">
            {isKrw ? krwPrice : usdPrice}
          </p>
          <p
            className={cn(
              "pr-2 text-toss-lg",
              changePct > 0
                ? "text-foreground-toss-bull"
                : "text-foreground-toss-bear"
            )}
          >
            {info?.changePct
              ? `${changePct > 0 ? "+" : ""}${changePct.toFixed(1)}%`
              : "-"}
          </p>
        </div>
      </TickerCard>
    </div>
  );
}

export default AddedTickerItem;
