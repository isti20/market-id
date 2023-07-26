import express from "express"
import { registerUser, loginUser, allData } from "../controllers/c_users.js"

const ROUTER = express.Router();

ROUTER.post('/users/new', registerUser);
ROUTER.post('/users/login', loginUser);
ROUTER.get('/users', allData);

export default ROUTER;