import express from "express";
import { createAddress, allAddress, detailAddress, updateAddress } from "../controllers/c_addresses.js";

import { authentication, customer } from "../middleware/auth.js";

const ROUTER = express.Router();

ROUTER.post('/address/new', authentication, customer, createAddress);
ROUTER.get('/address/list', authentication, customer, allAddress);
ROUTER.get('/address/:_id/detail', authentication, customer, detailAddress);
ROUTER.put('/address/:_id/update', authentication, customer, updateAddress);

export default ROUTER;