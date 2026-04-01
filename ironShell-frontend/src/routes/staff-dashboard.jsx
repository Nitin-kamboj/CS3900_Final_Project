import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/staff-dashboard")({
  component: routeComponent,
});

function routeComponent() {
  return (
    <div className="min-h-screen bg-black text-zinc-100 p-8 font-mono"></div>
  );
}
