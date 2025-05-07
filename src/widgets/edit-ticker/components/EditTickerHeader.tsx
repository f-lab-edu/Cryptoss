import CurrencySwitch from "@/shared/components/common/CurrencySwitch";

export default function EditTickerHeader() {
  return (
    <div className="flex justify-between items-center">
      <p className="font-semibold text-toss-xl text-foreground-toss">
        종목 편집
      </p>
      <CurrencySwitch />
    </div>
  );
}
