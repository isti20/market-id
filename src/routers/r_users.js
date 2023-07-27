import express from "express"
import { registerUser, loginUser, logoutUser, allData } from "../controllers/c_users.js"

const ROUTER = express.Router();

ROUTER.post('/users/new', registerUser);
ROUTER.post('/users/login', loginUser);
ROUTER.post('/users/:_id/logout', logoutUser);
ROUTER.get('/users', allData);

export default ROUTER;