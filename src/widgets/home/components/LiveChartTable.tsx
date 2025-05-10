import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import useTickerApi from "@/shared/hooks/useTickerApi";
import LiveChartTableRow from "@/widgets/home/components/LiveChartTableRow";

export default function LiveChartTable() {
  const { tickers } = useTickerApi();

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
        {tickers.length === 0 && (
          <TableRow>
            <TableCell colSpan={3}>No results.</TableCell>
          </TableRow>
        )}
        {tickers.map((ticker, index) => (
          <LiveChartTableRow ticker={ticker} index={index} />
        ))}
      </TableBody>
    </Table>
  );
}
