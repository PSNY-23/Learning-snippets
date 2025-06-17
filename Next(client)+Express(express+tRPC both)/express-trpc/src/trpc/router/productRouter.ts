import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { productSchema } from "../../schemas/productSchema";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../../services/productServices";

export const productRouter = router({
  hello: publicProcedure.input(z.string()).query(() => {
    return `hello `;
  }),
  create: publicProcedure.input(productSchema).mutation(({ input }) => createProduct(input)),

  getAll: publicProcedure.query(() => getAllProducts()),

  getById: publicProcedure.input(z.string()).query(({ input }) => getProductById(input)),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        data: productSchema.partial(), // only update what's sent
      })
    )
    .mutation(({ input }) => updateProduct(input.id, input.data)),

  delete: publicProcedure.input(z.string()).mutation(({ input }) => deleteProduct(input)),
});
