import { commonUrl } from "@/shared/api/api";
import AvatarProfile from "@/shared/components/common/AvatarProfile";
import { TableCell, TableRow } from "@/shared/components/ui/table";
import { Ticker } from "@/shared/db";
import useBinanceTickerInfo from "@/shared/hooks/useBinanceTickerInfo";
import useUsdKrwExchangeRate from "@/shared/hooks/useUsdKrwExchangeRate";
import { cn, formatToKrw, formatToUsd } from "@/shared/lib/utils";
import useCurrencyExchangeStore from "@/shared/store";
import Blink from "@/widgets/home/components/blink-test";
import { STABLE_COIN } from "@/widgets/home/lib/constants";
import { useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";

interface Props {
  ticker: Ticker;
  index: number;
}

export default function LiveChartTableRow({ ticker, index }: Props) {
  const formattedTicker = useMemo(
    () => ticker.symbol.toLowerCase() + STABLE_COIN,
    [ticker.symbol]
  );
  const memoizedTicker = useMemo(() => [formattedTicker], [formattedTicker]);
  const tickerInfo = useBinanceTickerInfo(memoizedTicker);
  const info = tickerInfo[formattedTicker];

  const changePct = info?.changePct ? parseFloat(info.changePct) : 0;
  const krwRate = useUsdKrwExchangeRate();
  const krwPrice = info?.price ? `${formatToKrw(info.price, krwRate)}원` : "-";
  const usdPrice = info?.price ? `$${formatToUsd(info.price)}` : "-";
  const tickerCapital = ticker.symbol.toUpperCase();

  const isKrw = useCurrencyExchangeStore((state) => state.isKrw);
  const navigate = useNavigate();

  const handleNavigate = (ticker: string) => {
    console.log(ticker);
    navigate({
      to: "/ticker-details/$detailId",
      params: { detailId: ticker },
    });
  };

  return (
    <TableRow
      key={ticker.id}
      className={cn(
        "text-foreground-toss cursor-pointer",
        (index + 1) % 2 !== 0 && "bg-background-toss-secondary/50"
      )}
      tabIndex={0}
      role="button"
      onClick={() => handleNavigate(formattedTicker)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleNavigate(formattedTicker);
        }
      }}
    >
      <TableCell>
        <AvatarProfile
          src={commonUrl.upbitCoinImgUrl(tickerCapital)}
          ticker={tickerCapital}
        />
      </TableCell>
      <TableCell className="text-right">
        <p className="text-toss-lg">{isKrw ? krwPrice : usdPrice}</p>
      </TableCell>
      <TableCell className="h-[44px]">
        <Blink changePct={changePct}>
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
        </Blink>
      </TableCell>
    </TableRow>
  );
}
