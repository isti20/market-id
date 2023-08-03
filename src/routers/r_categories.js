import express from "express";
import { createCategory, allCategory } from "../controllers/c_cetegories.js";

import { authentication, admin } from "../middleware/auth.js";

const ROUTER = express.Router();

ROUTER.post('/categories/new', authentication, admin, createCategory);
ROUTER.get('/categories', authentication, admin, allCategory);

export default ROUTER;