import express from "express";
import { createCheckout, allCheckout, historyCheckout } from "../controllers/c_checkouts.js";

import { authentication, admin, customer } from "../middleware/auth.js";

const ROUTER = express.Router();

ROUTER.post('/checkout/new', authentication, customer, createCheckout);
ROUTER.get('/checkout/list', authentication, admin, allCheckout);
ROUTER.get('/checkout/:_id/history', authentication, customer, historyCheckout);

export default ROUTER;