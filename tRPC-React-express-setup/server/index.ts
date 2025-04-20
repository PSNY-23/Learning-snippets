// index.ts
import express from 'express';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import { router } from './trpc';
import { todoRouter } from './routers/todo';

const app = express();
const port = 4000;

const appRouter = router({
  todo: todoRouter,
});

app.use(cors());
app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: () => ({}),
  }),
);

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});

// Access them at: 
// http://localhost:4000/trpc/todo.getAll
// http://localhost:4000/trpc/todo.add
// http://localhost:4000/trpc/todo.toggle


export type AppRouter = typeof appRouter;
