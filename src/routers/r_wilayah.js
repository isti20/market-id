import express from "express";
import { provinces, regencies, district, villages } from "../controllers/c_wilayah.js";

const ROUTER = express.Router();

ROUTER.get("/provinces", provinces);
ROUTER.get("/regencies/:id", regencies);
ROUTER.get("/district/:id", district);
ROUTER.get("/villages/:id", villages);

export default ROUTER;