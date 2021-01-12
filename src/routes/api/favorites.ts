import { Router } from 'express';
import { createFavorite, deleteFavorite, favoritePosts } from '../../controllers/favorites.controller';
const router = Router();

router.get("/favorites/:id/posts", favoritePosts);
router.post("/favorites/create", createFavorite);
router.delete("/favorites/delete", deleteFavorite);

export default router;