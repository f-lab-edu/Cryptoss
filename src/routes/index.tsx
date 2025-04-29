import { Button } from "@/shared/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import PlusIcon from "@/assets/icons/plus.svg?react";
import CurrencySwitch from "@/shared/components/common/currency-switch";
import { DOLLAR, WON } from "@/shared/lib/constants";
import LiveChartTable from "@/widgets/home/components/live-chart-table";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-5">
      <header className="col gap-4">
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
      </header>
      <main className="pt-4">
        <LiveChartTable />
      </main>
    </div>
  );
}
