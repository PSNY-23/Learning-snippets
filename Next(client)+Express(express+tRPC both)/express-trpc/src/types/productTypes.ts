import { z } from "zod";
import { productSchema } from "../schemas/productSchema";
export type ProductInput = z.infer<typeof productSchema>;
