import useCurrencyExchangeStore from "@/shared/store";
import { Switch } from "../ui/switch";
import { useShallow } from "zustand/react/shallow";

interface Props {
  leftText: string;
  rightText: string;
}

function CurrencySwitch({ leftText, rightText }: Props) {
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
        leftText={leftText}
        rightText={rightText}
        checked={isKrw}
        onCheckedChange={(checked) => setIsKrw(checked)}
        disabled={exchangeError}
      />
    </div>
  );
}

export default CurrencySwitch;
