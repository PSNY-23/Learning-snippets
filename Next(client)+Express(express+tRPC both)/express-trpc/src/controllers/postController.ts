import { Request, Response } from "express";
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../services/postServices";

export const createPostController = async (req: Request, res: Response) => {
  const post = await createPost(req.body);
  res.json(post);
};

export const getPostsController = async (req: Request, res: Response) => {
  const posts = await getPosts();
  res.json(posts);
};

export const getPostByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await getPostById(id);
  res.json(post);
};

export const updatePostController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await updatePost(id, req.body);
  res.json(post);
};

export const deletePostController = async (req: Request, res: Response) => {
  const { id } = req.params;
  await deletePost(id);
  res.status(204).json({ message: "Post deleted" });
};
