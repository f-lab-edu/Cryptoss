import LiveTradingChart from "@/widgets/ticker-detail/components/LiveTradingChart";
import TickerDetailHeader from "@/widgets/ticker-detail/components/TickerDetailHeader";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/ticker-details/$detailId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { detailId } = Route.useParams();
  return (
    <div className="pt-4 col gap-4">
      <header>
        <TickerDetailHeader ticker={detailId} />
      </header>
      <main>
        <LiveTradingChart
          symbol={detailId.toUpperCase()}
          interval="30m"
          height={400}
          width={660}
        />
      </main>
    </div>
  );
}
