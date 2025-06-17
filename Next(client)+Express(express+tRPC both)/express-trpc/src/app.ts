import express, {Request, Response } from 'express';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import postRoutes from './routes/postRoutes';
import { appRouter } from './trpc';
import { createContext } from './trpc/context';

const app = express();

app.use(cors());
app.use(express.json());

//test route
app.get("/", ( req:Request, res:Response) => {
     res.json({message: "app is working..."})
})

// Express routes
app.use('/api/posts', postRoutes);

// tRPC routes
app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

export default app;
