import express from "express";
import { createCheckout, allCheckout, historyCheckout, detailCheckout } from "../controllers/c_checkouts.js";

import { authentication, admin, customer } from "../middleware/auth.js";

const ROUTER = express.Router();

ROUTER.post('/checkout/new', authentication, customer, createCheckout);
ROUTER.get('/checkout/list', authentication, admin, allCheckout);
ROUTER.get('/checkout/:_id/history', authentication, customer, historyCheckout);
ROUTER.get('/checkout/:invoice/detail', authentication, detailCheckout);

export default ROUTER;