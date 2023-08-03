import express from "express";
import { createCategory } from "../controllers/c_cetegories.js";

import { authentication, admin } from "../middleware/auth.js";

const ROUTER = express.Router();

ROUTER.post('/categories/new', authentication, admin, createCategory);

export default ROUTER;