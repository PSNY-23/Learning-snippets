// ✅ utils/trpc.ts
'use client'; // Required for using hooks in Next.js app router

import { createTRPCReact } from '@trpc/react-query'; // react-query + tRPC integration
import type { AppRouter } from '@/server/routers/_app'; // import route types

export const trpc = createTRPCReact<AppRouter>(); // create a client with full type-safety from backend
