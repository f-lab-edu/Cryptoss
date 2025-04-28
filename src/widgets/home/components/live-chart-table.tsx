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

const symbols = [
  "btcusdc",
  "ethusdc",
  "xrpusdc",
  "solusdc",
  "adausdc",
  "xlmusdc",
  "dogeusdc",
];

function LiveChartTable() {
  const tickerInfo = useBinanceTickerInfo(symbols);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[10%]">종목</TableHead>
          <TableHead className="text-right">현재가</TableHead>
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
                  ticker={symbol
                    .replace(STABLE_COIN, `/${STABLE_COIN}`)
                    .toUpperCase()}
                />
              </TableCell>
              <TableCell className="text-right">{info?.price ?? "-"}</TableCell>
              <TableCell className="text-right">
                <p className="pr-2">{info?.changePct ?? "-"}</p>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export default LiveChartTable;
