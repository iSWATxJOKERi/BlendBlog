import { Router } from 'express';
import { createPost, deletePost, deliverSearch, getPost, getPosts, updatePost } from '../../controllers/posts.controller';
const router = Router();

router.get("/posts/:cu/all", getPosts);
router.get("/posts/search/:query/id/:cu", deliverSearch);
router.get("/posts/:id", getPost);
router.post("/posts/create", createPost);
router.patch("/posts/:id/update", updatePost);
router.delete("posts/:id/delete", deletePost);

export default router;