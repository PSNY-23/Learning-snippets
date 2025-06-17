import { Router } from 'express';
import {
  createPostController,
  getPostsController,
  getPostByIdController,
  updatePostController,
  deletePostController,
} from '../controllers/postController';

const router = Router();

router.post('/', createPostController);
router.get('/', getPostsController);
router.get('/:id', getPostByIdController);
router.put('/:id', updatePostController);
router.delete('/:id', deletePostController);

export default router;
