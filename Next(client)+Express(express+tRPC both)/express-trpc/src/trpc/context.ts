import { prisma } from '../utils/prisma';

export const createContext = () => ({ prisma });

export type Context = ReturnType<typeof createContext>;
