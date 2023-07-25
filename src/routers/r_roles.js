import express from "express";
import { createRole } from "../controllers/c_roles.js";

const ROUTER = express.Router();

ROUTER.post('/roles/new', createRole);

export default ROUTER;