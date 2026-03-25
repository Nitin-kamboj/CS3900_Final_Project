import { Plans } from "../components/plans";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/plans")({
  component: ()=> {
  console.log("PlanPage loaded");
  return <Plans />;
}
});