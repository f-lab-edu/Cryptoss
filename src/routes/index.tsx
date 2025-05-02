import { createFileRoute } from "@tanstack/react-router";
import LiveChartTable from "@/widgets/home/components/LiveChartTable";
import HomePageHeader from "@/widgets/home/components/HomePageHeader";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-5">
      <header className="col gap-4">
        <HomePageHeader />
      </header>
      <main className="pt-4">
        <LiveChartTable />
      </main>
    </div>
  );
}
