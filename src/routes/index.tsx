import { createFileRoute } from "@tanstack/react-router";
import LiveChartTable from "@/widgets/home/components/LiveChartTable";
import HomePageHeader from "@/widgets/home/components/HomePageHeader";
import { useEffect } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  useEffect(() => {
    window.addEventListener("offline", () =>
      toast.error("네트워크 오류", {
        description: "네트워크가 연결되지 않았습니다.",
      })
    );
  }, []);

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
