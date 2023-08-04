import express from "express";
import { createCheckout } from "../controllers/c_checkouts.js";

import { authentication, admin, customer } from "../middleware/auth.js";

const ROUTER = express.Router();

ROUTER.post('/checkout/new', authentication, customer, createCheckout);

export default ROUTER;