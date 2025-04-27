import AvatarProfile from "@/shared/components/common/avatar-profile";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { cn } from "@/shared/lib/utils";
import useBinanceTickerInfo from "../hooks/useBinanceTickerInfo";
import { STABLE_COIN } from "../lib/constants";
import { homePageUrl } from "../api/api";
import useUsdKrwExchangeRate from "@/shared/hooks/useUsdKrwExchangeRate";
import useCurrencyExchangeStore from "../../../shared/store";
import Blink from "./blink";

const symbols = [
  "btcusdc",
  "ethusdc",
  "xrpusdc",
  "solusdc",
  "adausdc",
  "xlmusdc",
  "dogeusdc",
];

export default function LiveChartTable() {
  const tickerInfo = useBinanceTickerInfo(symbols);
  const usdKrw = useUsdKrwExchangeRate();
  const isKrw = useCurrencyExchangeStore((state) => state.isKrw);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[10%]">종목</TableHead>
          <TableHead className="text-right min-w-[110px]">현재가</TableHead>
          <TableHead className="text-right">등락률</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {symbols.length === 0 && (
          <TableRow>
            <TableCell colSpan={3}>No results.</TableCell>
          </TableRow>
        )}
        {symbols.map((symbol, index) => {
          const info = tickerInfo[symbol];
          const pctChange = info?.changePct ? parseFloat(info.changePct) : 0;
          const krwPrice = info?.price
            ? `${Math.trunc(parseFloat(info.price) * (usdKrw ?? 1)).toLocaleString()}원`
            : "-";
          const usdPrice = info?.price
            ? `$${Number(parseFloat(info.price).toFixed(2)).toLocaleString()}`
            : "-";
          return (
            <TableRow
              key={symbol + index}
              className={cn(
                "text-foreground-toss",
                (index + 1) % 2 !== 0 && "bg-background-toss-secondary/50"
              )}
            >
              <TableCell>
                <AvatarProfile
                  src={homePageUrl.upbitCoinImgUrl(
                    symbol.replace(STABLE_COIN, "").toUpperCase()
                  )}
                  ticker={symbol.replace(STABLE_COIN, "").toUpperCase()}
                />
              </TableCell>
              <TableCell className="text-right">
                <p className="text-toss-lg">{isKrw ? krwPrice : usdPrice}</p>
              </TableCell>
              <TableCell className="h-[44px]">
                <Blink pctChange={pctChange}>
                  <p
                    className={cn(
                      "pr-2 text-toss-lg",
                      pctChange > 0
                        ? "text-foreground-toss-bull"
                        : "text-foreground-toss-bear"
                    )}
                  >
                    {info?.changePct
                      ? `${pctChange > 0 ? "+" : ""}${pctChange.toFixed(1)}%`
                      : "-"}
                  </p>
                </Blink>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
