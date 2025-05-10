import TickerEditModal from "./TickerEditModal";
import useTickerApi from "@/shared/hooks/useTickerApi";
import AddedTickerItem from "@/widgets/edit-ticker/components/AddedTickerItem";

export default function AddedTickerList() {
  const { tickers } = useTickerApi();

  return (
    <div className="col pt-4">
      <TickerEditModal />
      {tickers.map((ticker) => (
        <AddedTickerItem key={ticker.symbol} ticker={ticker} />
      ))}
    </div>
  );
}
