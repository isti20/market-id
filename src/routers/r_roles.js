import express from "express";
import { createRole, allRole, detailRole } from "../controllers/c_roles.js";

const ROUTER = express.Router();

ROUTER.post('/role/new', createRole);
ROUTER.get('/role/all', allRole);
ROUTER.get('/role/:_id/detail', detailRole);

export default ROUTER;