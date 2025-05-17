import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toaster } from "sonner";
import logoUrl from "@/assets/cryptoss-logo.png";

export const Route = createRootRoute({
  component: () => (
    <div className="bg-foreground">
      <div className="min-w-[344px] max-w-[700px] mx-auto p-5 bg-background-toss h-[100dvh] overflow-auto">
        <Link to="/" className="flex gap-2 no-underline">
          <img src={logoUrl} width={32} height={32} />
          <p className="font-bold text-foreground-toss text-toss-xl">
            크립토스
          </p>
        </Link>
        <Outlet />
        <TanStackRouterDevtools />
        <Toaster richColors={true} position="top-center" />
      </div>
    </div>
  ),
});
