import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { useRoutes } from "./routes/userRoutes";
import { authRoutes } from "./routes/authRoutes";
import { webSocketRoutes } from "./routes/websocketRoutes";

const app = new Elysia();

app.use(cors());
app.use(useRoutes);
app.use(authRoutes);
app.use(webSocketRoutes)

app.listen(3000)

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
