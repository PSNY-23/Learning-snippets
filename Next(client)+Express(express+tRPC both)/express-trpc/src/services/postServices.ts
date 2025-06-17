import { prisma } from "../utils/prisma";
import { PostInput } from "../types/postType";

export const createPost = async (data: PostInput) => {
  return await prisma.post.create({ data });
};

export const getPosts = async () => {
  return await prisma.post.findMany();
};

export const getPostById = async (id: string) => {
  return await prisma.post.findUnique({ where: { id } });
};

export const updatePost = async (id: string, data: PostInput) => {
  return await prisma.post.update({ where: { id }, data });
};

export const deletePost = async (id: string) => {
  return await prisma.post.delete({ where: { id } });
};
