import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Header } from "../components/Head.jsx";
import { Footer } from "../components/footer.jsx";
const RootLayout = () => (
  <>
    <Header/>
    <main >
    <Outlet/>
    </main>
    <Footer/>
    <TanStackRouterDevtools />
  </>
)

export const Route = createRootRoute({ component: RootLayout })