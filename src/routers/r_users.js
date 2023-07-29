import express from "express";
import { registerUser, loginUser, logoutUser, allData, detailUser, updateUser } from "../controllers/c_users.js";
import { authentication, admin } from "../middleware/auth.js";

const ROUTER = express.Router();

ROUTER.post('/users/new', registerUser);
ROUTER.post('/users/login', loginUser);
ROUTER.post('/users/:_id/logout', authentication, logoutUser);
ROUTER.get('/users', authentication, admin, allData);
ROUTER.get('/users/:_id/detail', authentication, detailUser);
ROUTER.put('/users/:_id/update', authentication, updateUser);

export default ROUTER;