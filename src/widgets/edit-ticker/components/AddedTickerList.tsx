import { commonUrl } from "@/shared/api/api";
import TickerCard from "@/shared/components/common/TickerCard";
import { STABLE_COIN } from "@/widgets/home/lib/constants";
import TickerEditModal from "./TickerEditModal";

const symbols = ["btcusdc", "ethusdc"];

export default function AddedTickerList() {
  return (
    <div className="col gap-2 pt-4">
      <TickerEditModal />
      {symbols.map((symbol) => (
        <div className="px-1 py-2">
          <TickerCard
            src={commonUrl.upbitCoinImgUrl(
              symbol.replace(STABLE_COIN, "").toUpperCase()
            )}
            ticker={symbol.replace(STABLE_COIN, "").toUpperCase()}
          >
            <p className="text-white">price</p>
          </TickerCard>
        </div>
      ))}
    </div>
  );
}
