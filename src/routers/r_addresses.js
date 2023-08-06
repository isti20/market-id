import express from "express";
import { createAddress } from "../controllers/c_addresses.js";

import { authentication, customer } from "../middleware/auth.js";

const ROUTER = express.Router();

ROUTER.post('/address/new', authentication, customer, createAddress);

export default ROUTER;