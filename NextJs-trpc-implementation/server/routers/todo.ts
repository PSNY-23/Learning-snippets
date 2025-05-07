// ✅ server/routers/todo.ts
import { z } from "zod"; // zod is used for input validation
import { prisma } from "@/lib/db"; // importing Prisma client instance to interact with DB
import { router, publicProcedure } from "../trpc"; // using helpers from trpc setup

export const todoRouter = router({
  // Define a query to get all todos
  getAll: publicProcedure.query(async () => {
    return prisma.todo.findMany(); // Fetches all todos from the DB
  }),

  // Define a mutation to add a new todo
  add: publicProcedure
    .input(z.object({ title: z.string() })) // validate input has a 'title' string
    .mutation(async ({ input }) => {
      return prisma.todo.create({ data: { title: input.title } }); // insert new todo to DB
    }),

  // Define a mutation to delete a todo by ID
  delete: publicProcedure
    .input(z.object({ id: z.string() })) // validate input has 'id' string
    .mutation(async ({ input }) => {
      return prisma.todo.delete({ where: { id: input.id } }); // delete todo by ID
    }),
});
