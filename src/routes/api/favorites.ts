import { Router } from 'express';
import { createFavorite, deleteFavorite } from '../../controllers/favorites.controller';
const router = Router();

router.post("/favorites/create", createFavorite);
router.delete("/favorites/delete", deleteFavorite);

export default router;