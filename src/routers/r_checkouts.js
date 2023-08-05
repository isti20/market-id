import express from "express";
import { createCheckout, allCheckout } from "../controllers/c_checkouts.js";

import { authentication, admin, customer } from "../middleware/auth.js";

const ROUTER = express.Router();

ROUTER.post('/checkout/new', authentication, customer, createCheckout);
ROUTER.get('/checkout/list', authentication, admin, allCheckout);

export default ROUTER;