import Elysia from "elysia";

export const authRoutes = new Elysia({ prefix: "/auth" });

authRoutes.get("/", () => {
  return { message: "auth/ route is working" };
});

authRoutes.get("/:id", ({params}) => {
  return { message: params.id};
});
