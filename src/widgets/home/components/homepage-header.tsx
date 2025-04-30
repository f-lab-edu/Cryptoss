import CurrencySwitch from "@/shared/components/common/currency-switch";
import { Button } from "@/shared/components/ui/button";
import { DOLLAR, WON } from "@/shared/lib/constants";
import { PlusIcon } from "lucide-react";

export default function HomePageHeader() {
  return (
    <>
      <div className="flex justify-between items-center">
        <p className="font-semibold text-toss-xl text-foreground-toss">
          실시간 차트
        </p>
        <Button className="gap-1">
          <PlusIcon className="w-5 h-5 text-white" />
          <span>종목 추가</span>
        </Button>
      </div>
      <div className="flex justify-end">
        <CurrencySwitch leftText={DOLLAR} rightText={WON} />
      </div>
    </>
  );
}
