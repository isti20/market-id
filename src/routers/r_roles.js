import express from "express";
import { createRole, allRole, detailRole, updateRole, deleteRole } from "../controllers/c_roles.js";

const ROUTER = express.Router();

ROUTER.post('/role/new', createRole);
ROUTER.get('/role/all', allRole);
ROUTER.get('/role/:_id/detail', detailRole);
ROUTER.put('/role/:_id/update', updateRole);
ROUTER.delete('/role/:_id/destroy', deleteRole);

export default ROUTER;