import express from "express";
import { createRole, allRole } from "../controllers/c_roles.js";

const ROUTER = express.Router();

ROUTER.post('/role/new', createRole);
ROUTER.get('/role/all', allRole);

export default ROUTER;