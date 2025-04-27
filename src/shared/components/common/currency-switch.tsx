import useCurrencyExchangeStore from "@/shared/store";
import { Switch } from "../ui/switch";
import { useShallow } from "zustand/react/shallow";

interface Props {
  leftText: string;
  rightText: string;
}

function CurrencySwitch({ leftText, rightText }: Props) {
  const { isKrw, setIsKrw } = useCurrencyExchangeStore(
    useShallow((state) => ({
      isKrw: state.isKrw,
      setIsKrw: state.setIsKrw,
    }))
  );
  return (
    <div className="flex items-center space-x-2">
      <Switch
        leftText={leftText}
        rightText={rightText}
        checked={isKrw}
        onCheckedChange={(checked) => setIsKrw(checked)}
      />
    </div>
  );
}

export default CurrencySwitch;
