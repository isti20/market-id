import express from "express";
import { createProduct, allProduct, detailProduct } from "../controllers/c_products.js";

import { authentication, admin } from "../middleware/auth.js";
import uploadImg from "../middleware/upload_img.js";

const ROUTER = express.Router();

ROUTER.post('/products/new', authentication, admin, uploadImg, createProduct);
ROUTER.get('/products', authentication, allProduct);
ROUTER.get('/products/:_id/detail', authentication, admin, detailProduct);

export default ROUTER;