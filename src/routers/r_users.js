import express from "express"
import { registerUser, allData } from "../controllers/c_users.js"

const ROUTER = express.Router();

ROUTER.post('/users/new', registerUser);
ROUTER.get('/users', allData);

export default ROUTER;