import { Elysia } from "elysia";


export const useRoutes = new Elysia({ prefix: "/user" });

useRoutes.get("/", () => {
    return {message: "user/ : route is working"}
})

useRoutes.get("/:id", ({ params }) => {
    return {message: `The /user/:id = ${params.id}`}
})


