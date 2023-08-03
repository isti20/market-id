import express from "express";
import { createProduct, allProduct } from "../controllers/c_products.js";

import { authentication, admin } from "../middleware/auth.js";
import uploadImg from "../middleware/upload_img.js";

const ROUTER = express.Router();

ROUTER.post('/products/new', authentication, admin, uploadImg, createProduct);
ROUTER.get('/products', authentication, allProduct);

export default ROUTER;