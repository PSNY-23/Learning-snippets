import { prisma } from "../utils/prisma";
import { ProductInput } from "../types/productTypes";

export const createProduct = async (data: ProductInput) => {
  return await prisma.product.create({ data });
};

export const getAllProducts = async () => {
  return await prisma.product.findMany();
};

export const getProductById = async (id: string) => {
  return await prisma.product.findUnique({ where: { id } });
};

export const updateProduct = async (id: string, data: Partial<ProductInput>) => {
  return await prisma.product.update({ where: { id }, data });
};

export const deleteProduct = async (id: string) => {
  return await prisma.product.delete({ where: { id } });
};
