// ✅ app/api/trpc/[trpc]/route.ts
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'; // fetch adapter for Next.js API routes
import { appRouter } from '@/server/routers/_app'; // import combined router

// Create an API handler for both GET and POST
const handler = (req: Request) => {
  return fetchRequestHandler({
    endpoint: '/api/trpc', // API endpoint URL
    req, // the incoming request
    router: appRouter, // our tRPC router with all routes
    createContext: () => ({}), // optional context, empty for now
  });
};

export { handler as GET, handler as POST }; // export handler for both GET and POST methods
