import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/ticker-details/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
