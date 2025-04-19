import { Switch } from "../ui/switch";

interface Props {
  leftText: string;
  rightText: string;
}

function CurrencySwitch({ leftText, rightText }: Props) {
  return (
    <div className="flex items-center space-x-2">
      <Switch leftText={leftText} rightText={rightText} />
    </div>
  );
}

export default CurrencySwitch;
