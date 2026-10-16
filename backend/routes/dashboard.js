import authMiddleware from "../middlewares/authoMiddleware.js";
import { Router } from "express";
const router=Router();


router.get("/dashboard",authMiddleware);

export default router;