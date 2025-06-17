import { z } from "zod";
import { postSchema } from "../schemas/postSchema";

export type PostInput = z.infer<typeof postSchema>;
