import { Router } from 'express';
const router = Router();
import { getUser, getUsers } from '../../controllers/users_controller';

router.get("/users/all", getUsers);
router.get("/users/:id", getUser);
router.post("/users/register")

export default router;