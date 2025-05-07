// ✅ server/routers/_app.ts
import { router } from '../trpc'; // import router helper
import { todoRouter } from './todo'; // import your todo router

export const appRouter = router({
  todo: todoRouter, // register 'todo' routes under 'todo'
});

export type AppRouter = typeof appRouter; // export type for frontend client to infer routes
