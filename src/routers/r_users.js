import express from "express"
import { allData } from "../controllers/c_users.js"

const ROUTER = express.Router();

ROUTER.get('/users', allData);

export default ROUTER;