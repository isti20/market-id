import express from "express";
import { createAddress, allAddress } from "../controllers/c_addresses.js";

import { authentication, customer } from "../middleware/auth.js";

const ROUTER = express.Router();

ROUTER.post('/address/new', authentication, customer, createAddress);
ROUTER.get('/address/list', authentication, customer, allAddress);

export default ROUTER;