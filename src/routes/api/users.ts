import { Router } from 'express';
import passport from 'passport';
const router = Router();
import { getUser, getUsers, createUser, updateUser, loginUser } from '../../controllers/users.controller';

router.get("/users/current", passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        username: req.body.username
    })
})

router.get("/users/all", getUsers);
router.get("/users/:id", getUser);
router.post("/users/register", createUser);
router.post("/users/login", loginUser);
router.patch("users/:id", updateUser);

export default router;