import useCurrencyExchangeStore from "@/shared/store";
import { Switch } from "../ui/switch";
import { useShallow } from "zustand/react/shallow";
import { DOLLAR, WON } from "@/shared/lib/constants";

function CurrencySwitch() {
  const { isKrw, setIsKrw, exchangeError } = useCurrencyExchangeStore(
    useShallow((state) => ({
      isKrw: state.isKrw,
      setIsKrw: state.setIsKrw,
      exchangeError: state.exchangeError,
    }))
  );

  return (
    <div className="flex items-center space-x-2">
      <Switch
        leftText={DOLLAR}
        rightText={WON}
        checked={isKrw}
        onCheckedChange={(checked) => setIsKrw(checked)}
        disabled={exchangeError}
      />
    </div>
  );
}

export default CurrencySwitch;
