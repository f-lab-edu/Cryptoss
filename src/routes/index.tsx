import { createFileRoute } from "@tanstack/react-router";
import LiveChartTable from "@/widgets/home/components/live-chart-table";
import HomePageHeader from "@/widgets/home/components/homepage-header";

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
