import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Header } from "../components/Head.jsx";
import { Footer } from "../components/footer.jsx";

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <main className="min-h-screen bg-black">
        <Outlet />
      </main>
      <Footer />
      {/* Devtools only show up in development mode */}
      <TanStackRouterDevtools />
    </>
  ),
});