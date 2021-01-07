import { Router } from 'express';
const router = Router();
import { getUser, getUsers, createUser, updateUser } from '../../controllers/users.controller';

router.get("/users/all", getUsers);
router.get("/users/:id", getUser);
router.post("/users/register", createUser);
router.patch("users/:id", updateUser);

export default router;