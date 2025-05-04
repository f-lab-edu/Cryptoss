import AvatarProfile from "@/shared/components/common/AvatarProfile";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { cn, formatToKrw, formatToUsd } from "@/shared/lib/utils";
import useBinanceTickerInfo from "../hooks/useBinanceTickerInfo";
import { STABLE_COIN } from "../lib/constants";
import { homePageUrl } from "../api/api";
import useUsdKrwExchangeRate from "@/shared/hooks/useUsdKrwExchangeRate";
import useCurrencyExchangeStore from "../../../shared/store";
import { useNavigate } from "@tanstack/react-router";
import Blink from "./Blink";

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
  const krwRate = useUsdKrwExchangeRate();
  const isKrw = useCurrencyExchangeStore((state) => state.isKrw);
  const navigate = useNavigate();

  const handleNavigate = (symbol: string) =>
    navigate({
      to: "/ticker-details/$detailId",
      params: { detailId: symbol },
    });

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
          const changePct = info?.changePct ? parseFloat(info.changePct) : 0;
          const krwPrice = info?.price
            ? `${formatToKrw(info.price, krwRate)}원`
            : "-";
          const usdPrice = info?.price ? `$${formatToUsd(info.price)}` : "-";
          return (
            <TableRow
              key={symbol + index}
              className={cn(
                "text-foreground-toss cursor-pointer",
                (index + 1) % 2 !== 0 && "bg-background-toss-secondary/50"
              )}
              tabIndex={0}
              role="button"
              onClick={() => handleNavigate(symbol)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleNavigate(symbol);
                }
              }}
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
        })}
      </TableBody>
    </Table>
  );
}
