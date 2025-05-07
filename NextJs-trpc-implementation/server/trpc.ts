
import { initTRPC } from '@trpc/server';
// Importing the core tRPC initializer

const t = initTRPC.create();
// Initializes tRPC helpers like router, procedure, middleware
// helpers = router and publicProcedures

export const router = t.router;
// Used to define routers (groups of API endpoints)

export const publicProcedure = t.procedure;
// Used to define individual API procedures (queries/mutations)
