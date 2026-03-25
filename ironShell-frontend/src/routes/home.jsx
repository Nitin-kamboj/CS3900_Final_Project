import { createFileRoute, redirect, isRedirect } from "@tanstack/react-router";

export const Route = createFileRoute("/home")({
  beforeLoad: async () => {
    console.log("see me in console");
    const token = localStorage.getItem("token");
    if (!token) {
      throw redirect({ to: "/" });
    }
    try {
      const response = await fetch("http://localhost:3000/api/isValid", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        throw redirect({
          to: "/dashboard",
        });
      } else {
        // Token was invalid or expired
        localStorage.removeItem("token");
        throw redirect({ to: "/" });
      }
    } catch (error) {
      if (isRedirect(error)) {
        throw error;
      }
      console.log(error);
      throw redirect({
        to: "/",
      });
    }
  },
});
