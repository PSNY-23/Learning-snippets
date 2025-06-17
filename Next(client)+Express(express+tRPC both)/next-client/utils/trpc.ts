'use client';

import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import type { AppRouter } from '../../express-trpc/src/trpc/index'; // 🧠 Import types from backend

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: 'http://localhost:4000/trpc', // 🔥 Your express tRPC endpoint
    }),
  ],
});
