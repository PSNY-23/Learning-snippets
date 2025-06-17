import { productRouter } from './router/productRouter';
import { router } from './trpc';

export const appRouter = router({
  product: productRouter,
});

export type AppRouter = typeof appRouter;
