import { commonUrl } from "@/shared/api/api";
import CurrencySwitch from "@/shared/components/common/CurrencySwitch";
import { Avatar } from "@/shared/components/ui/avatar";
import useBinanceTickerInfo from "@/shared/hooks/useBinanceTickerInfo";
import { STABLE_COIN } from "@/widgets/home/lib/constants";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import useCoinName from "../hooks/useCoinName";
import useCurrencyExchangeStore from "@/shared/store";
import { formatToKrw, formatToUsd } from "@/shared/lib/utils";
import useUsdKrwExchangeRate from "@/shared/hooks/useUsdKrwExchangeRate";
import { useMemo } from "react";

interface Props {
  ticker: string;
}

export default function TickerDetailHeader({ ticker }: Props) {
  const memoizedTicker = useMemo(() => [ticker], [ticker]);

  const tickerInfo = useBinanceTickerInfo(memoizedTicker);
  const coinName = useCoinName(memoizedTicker);
  const isKrw = useCurrencyExchangeStore((state) => state.isKrw);
  const krwRate = useUsdKrwExchangeRate();

  const price = tickerInfo[ticker]?.price ?? "0";
  const changePct = parseFloat(tickerInfo[ticker]?.changePct ?? "0");
  const symbol = ticker.replace(STABLE_COIN, "").toUpperCase();
  return (
    <div className="flex justify-between">
      <div className="flex gap-[10px] items-center">
        <Avatar className="rounded-[12px] w-12 h-12">
          <AvatarImage
            src={commonUrl.upbitCoinImgUrl(symbol)}
            alt="coin-image"
            className="object-none"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="col">
          <div className="flex gap-1">
            <p className="text-foreground-toss text-toss-lg font-bold">
              {coinName}
            </p>
            <p className="text-foreground-toss-ticker text-toss-lg font-semibold">
              {symbol}
            </p>
          </div>
          <div className="flex gap-2 text-toss-md font-semibold items-center">
            <p className="text-foreground-toss text-toss-xl font-bold">
              {isKrw
                ? formatToKrw(price, krwRate) + "원"
                : "$" + formatToUsd(price)}
            </p>
            <div className="flex gap-1 text-foreground-toss-secondary flex-wrap">
              <p>
                {isKrw
                  ? "$" + formatToUsd(price)
                  : formatToKrw(price, krwRate) + "원"}
              </p>
              <p>|</p>
              <p>어제보다</p>
              <p className="">{`${changePct > 0 ? "+" : ""}${changePct.toFixed(1)}%`}</p>
            </div>
          </div>
        </div>
      </div>
      <CurrencySwitch />
    </div>
  );
}
