import { Router } from 'express';
const router = Router();
import { getUser, getUsers, createUser, updateUser, loginUser } from '../../controllers/users.controller';

router.get("/users/all", getUsers);
router.get("/users/:id", getUser);
router.post("/users/register", createUser);
router.post("/users/login", loginUser);
router.patch("users/:id", updateUser);

export default router;