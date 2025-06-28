import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

export const env = z.object({
  PORT: z.string().default('3000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DATABASE_URL: z.string(),
}).parse(process.env);
