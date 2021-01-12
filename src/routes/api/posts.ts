import { Router } from 'express';
import { createPost, deletePost, getPost, getPosts, updatePost } from '../../controllers/posts.controller';
const router = Router();

router.get("/posts/all", getPosts);
router.get("/posts/:id", getPost);
router.post("/posts/create", createPost);
router.patch("/posts/:id/update", updatePost);
router.delete("posts/:id/delete", deletePost);

export default router;