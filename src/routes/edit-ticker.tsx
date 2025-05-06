import AddedTickerList from "@/widgets/edit-ticker/components/AddedTickerList";
import EditTickerHeader from "@/widgets/edit-ticker/components/EditTickerHeader";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/edit-ticker")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-5">
      <header>
        <EditTickerHeader />
      </header>
      <main className="pt-4">
        <AddedTickerList />
      </main>
    </div>
  );
}
