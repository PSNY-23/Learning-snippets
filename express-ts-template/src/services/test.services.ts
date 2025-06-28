import { prisma } from '../config/prisma';

export const createTestService = async (name: string) => {
  return prisma.test.create({ data: { name } });
};
