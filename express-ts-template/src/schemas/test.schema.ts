import { z } from 'zod';

export const createTestSchema = z.object({
  body: z.object({
    name: z.string().min(1),
  }),
});
